const getCurrentNodes = callback =>
  cy
    .contains("Log Nodes")
    .click()
    .then(() => {
      const nodes = JSON.parse(Cypress.$("#OUTPUT").text());
      callback(nodes);
    });

describe("<NodeEditor/> Interactions", () => {
  it("Successfully loads", () => {
    cy.visit("/test");
  });

  it("Can add 3 nodes", () => {
    cy.get('[data-flume-stage="true"]').rightclick(250, 200);
    cy.get(`[role="menu"]`)
      .contains(/^Number$/)
      .click();
    cy.get('[data-flume-stage="true"]').rightclick(250, 350);
    cy.get(`[role="menu"]`)
      .contains(/^Number$/)
      .click();
    cy.get('[data-flume-stage="true"]').rightclick(500, 250);
    cy.get(`[role="menu"]`)
      .contains(/^Add Numbers$/)
      .click();
    cy.contains("h2", /^Number$/);
    cy.contains("h2", /^Add Numbers$/);

    getCurrentNodes(nodes => {
      expect(Object.keys(nodes).length).to.equal(3);
      expect(
        Object.values(nodes).filter(node => node.type === "number").length
      ).to.equal(2);
      expect(
        Object.values(nodes).filter(node => node.type === "addNumbers").length
      ).to.equal(1);
    });
  });

  it("Can type in number inputs", () => {
    cy.get(`input[type="number"]`)
      .first()
      .clear()
      .type(10);
    cy.get(`input[type="number"]`)
      .eq(1)
      .clear()
      .type(20);

    getCurrentNodes(nodes => {
      expect(Object.values(nodes).filter(node => node.type === "number" && node.inputData.number.number === 10).length).to.equal(1)
      expect(Object.values(nodes).filter(node => node.type === "number" && node.inputData.number.number === 20).length).to.equal(1)
    })
  });

  it("Can connect nodes", () => {
    const firstInputRect = Cypress.$(
      `[data-port-transput-type="input"]`
    )[2].getBoundingClientRect();
    cy.get(`[data-port-transput-type="output"]`)
      .eq(1)
      .trigger("mousedown")
      .trigger("mousemove", {
        clientX: firstInputRect.x + firstInputRect.width / 2,
        clientY: firstInputRect.y + firstInputRect.height / 2
      });
    cy.get(`[data-port-transput-type="input"]`)
      .eq(3)
      .trigger("mouseup", firstInputRect.width / 2, firstInputRect.height / 2)
      .then(() => {
        const secondInputRect = Cypress.$(
          `[data-port-transput-type="input"]`
        )[3].getBoundingClientRect();

        cy.get(`[data-port-transput-type="output"]`)
          .first()
          .trigger("mousedown")
          .trigger("mousemove", {
            clientX: secondInputRect.x + secondInputRect.width / 2,
            clientY: secondInputRect.y + secondInputRect.height / 2
          });
        cy.get(`[data-port-transput-type="input"]`)
          .eq(2)
          .trigger(
            "mouseup",
            secondInputRect.width / 2,
            secondInputRect.height / 2
          );

        getCurrentNodes(nodes => {
          const addNumberId = Object.values(nodes).find(node => node.type === "addNumbers").id
          Object.values(nodes).forEach(node => {
            if(node.type === "number"){
              expect(Object.keys(node.connections.outputs).length).to.equal(1)
              expect(node.connections.outputs.number[0].nodeId).to.equal(addNumberId)
            }
            else if(node.type === "addNumbers"){
              expect(Object.keys(node.connections.outputs).length).to.equal(0)
              expect(Object.keys(node.connections.inputs).length).to.equal(2)
              expect(node.connections.inputs.num1[0].nodeId).to.not.equal(addNumberId)
              expect(node.connections.inputs.num2[0].nodeId).to.not.equal(addNumberId)
            }
          })
        })
      });
  });

  it("Can move nodes", () => {
    getCurrentNodes(nodes => {
      const addNumberNode = Object.values(nodes).find(node => node.type === "addNumbers");

      cy.contains("Add Numbers")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: 500, clientY: 200 })
        .trigger("mousemove", { clientX: 600, clientY: 600 })
        .trigger("mousemove", { clientX: 700, clientY: 200 })
        .trigger("mouseup");

      getCurrentNodes(nodes => {
        const newAddNumberNode = Object.values(nodes).find(node => node.type === "addNumbers");
        expect(addNumberNode.x).to.not.equal(newAddNumberNode.x)
        expect(addNumberNode.y).to.not.equal(newAddNumberNode.y)
      })
    })
  });
});
