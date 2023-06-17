describe('Death Star Calculator Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('button').contains('Neue Berechnung').click();
  });

  it('Should open the popover and set the focus to the text field when Neue Berechnung is clicked', () => {
    cy.get('input').invoke('focus').should('be.focused');
  });

  it('Volumen berechnen and Berechnung übernehmen buttons are not present if no opponent is selected', () => {
    cy.get('button').contains('Volumen berechnen').should('not.exist');
    cy.get('button').contains('Berechnung übernehmen').should('not.exist');
  });

  it('Should start to show suggestions when typing names into the text field', () => {
    cy.get('[data-cy="searchField"]').type('skywalker');
    cy.get('[data-cy="personName"]').should('be.visible');
  });

  it('Suggestions can be highlighted with the arrow keys and added to the list with Enter', () => {
    cy.get('[data-cy="searchField"]').type('skywalker');
    cy.get('[data-cy="personName"]').eq(2).trigger('keydown', { keyCode: 13, which: 13 });
    cy.get('[data-cy="selectedPeople"]').should('contain', 'Shmi Skywalker');
  });

  it('The result appears in the table after clicking on Volumen berechnen and Berechnung übernehmen', () => {
    cy.get('[data-cy="searchField"]').type('Luke');
    cy.get('[data-cy="personName"]').eq(0).trigger('keydown', { keyCode: 13, which: 13 });
    cy.get('[data-cy="volumeButton"]').click();
    cy.get('[data-cy="saveButton"]').click();
    cy.get('.sw-app-container').should('be.visible');
  });
});
