/// <reference types="cypress" />

before(() => {
  cy.visit('http://localhost:4200/#/')
})

beforeEach(() => {
  cy.reload()
})

describe('Fluxo normal de verificação', () => {
  
  it('pesquisa de produtos', ()=>{
    cy.get('input').type('blue')
    cy.get('.mat-card .product-name').should('contain.text', 'blue')
    cy.get('input').clear()
    cy.get('.mat-card .product-name').its('length').should('be.eq', 3)
  })

  it('Verificando filtro por cor', ()=>{
    cy.get('.blue').click()
    cy.get('.mat-card .product-name').its('length').should('be.gte', 1)
    cy.get('button[matTooltip="Limpa filtro"]').click()
    cy.get('.mat-card .product-name').its('length').should('be.eq', 3)
  })

  it('Verificando filtro por tamanho', ()=>{
    cy.get('#mat-chip-list-0 > .mat-chip-list-wrapper > :nth-child(2)').click()
    cy.get('.mat-card .product-name').its('length').should('be.gte', 1)
    cy.get('button[matTooltip="Limpa filtro"]').click()
    cy.get('.mat-card .product-name').its('length').should('be.eq', 3)
  })

  it('Open menu hamburguer', ()=>{
    cy.get('[src="/assets/hamburger.svg"]').click()
    cy.get('.mat-drawer-opened').its('length').should('be.eq', 1)
    cy.get('.prodcts').click()
    cy.get('.mat-drawer-opened').should('not.exist')
  })

  it('Open Carrinho', ()=>{
    cy.get('.row[style]').click()
    cy.get('.mat-drawer-opened').its('length').should('be.eq', 1)
    cy.get('h4.ng-star-inserted').should('contain.text', 'You cart is empty')
    cy.get('button[matTooltip="Fechar"]').click()
    cy.get('.mat-drawer-opened').should('not.exist')
  })

  it('Adicionar produto ao carrinho', ()=>{
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')
  })

  it('Adicionar produto ao carrinho aumentando e diminuido a quantidade', ()=>{
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('button[mattooltip="aumentar a quantidade"]').click().click()
    cy.get('#valor').should('contain.text', 3*19)
    cy.get('button[mattooltip="diminuir a quantidade"]').click()
    cy.get('#valor').should('contain.text', 2*19)
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')
  })

  it('Adicionando o mesmo produto no carrinho com os tamanhos diferentes', ()=>{
    // Adicionado o primerio produto
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')

    // Adicionado o segundo produto
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(1)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="2"]').should('exist')
  })

  it('Adicionando dois produtos diferentes no carrinho', ()=>{
    // Adicionado o primerio produto
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')

    // Adicionado o segundo produto
    cy.get(':nth-child(2) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'white')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(1)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="2"]').should('exist')
  })

  it('Adicionar produto ao carrinho e diminuido a quantidade ate 0(zero)', ()=>{
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('button[mattooltip="diminuir a quantidade"]').click()
    cy.get('.modal-body').should('not.exist')
  })

  it('Adicionar produto ao carrinho aumentando e diminuido a quantidade dentro do carrinho', ()=>{
    // Montando o cenário
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')
    // Abrindo o carrinho
    cy.get('.mat-badge[ng-reflect-content="1"]').click()
    cy.get('.mat-drawer-opened').its('length').should('be.eq', 1)
    // Verificando o dado do produto
    cy.get('.mat-drawer-opened .product-name').should('contain.text', 'blue')
    // Aumentado a quantidade
    cy.get('button[mattooltip="aumentar a quantidade"]').click().click()
    cy.get('.valor').should('contain.text', 3*19)
    cy.get('button[mattooltip="diminuir a quantidade"]').click()
    cy.get('.valor').should('contain.text', 2*19)
    // Verificando subtotal e total
    cy.get('.subTotal').should('contain.text', 2*19)
    cy.get('#total').should('contain.text', 2*19)
    // Fechando o carrinho
    cy.get('button[matTooltip="Fechar"]').click()
    cy.get('.mat-drawer-opened').should('not.exist')
  })

  it('Adicionar dois produtos ao carrinho aumentando e diminuido a quantidade dentro do carrinho', ()=>{
    // Montando o cenário
    // Adicionado o primerio produto
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')
    // Adicionado o segundo produto
    cy.get(':nth-child(2) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'white')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(1)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="2"]').should('exist')
    // Abrindo o carrinho
    cy.get('.mat-badge[ng-reflect-content="2"]').click()
    cy.get('.mat-drawer-opened').its('length').should('be.eq', 1)
    // Verificando os dados dos produtos
    cy.get('.mat-drawer-opened .product-name:eq(0)').should('contain.text', 'blue')
    cy.get('.mat-drawer-opened .product-name:eq(1)').should('contain.text', 'white')
    // Aumentado a quantidade
    // Produto 01
    cy.get('button[mattooltip="aumentar a quantidade"]:eq(0)').click().click()
    cy.get('.valor:eq(0)').should('contain.text', 3*19)
    cy.get('button[mattooltip="diminuir a quantidade"]:eq(0)').click()
    cy.get('.valor:eq(0)').should('contain.text', 2*19)
    // Produto 02
    cy.get('button[mattooltip="aumentar a quantidade"]:eq(1)').click().click()
    cy.get('.valor:eq(1)').should('contain.text', 3*19)
    cy.get('button[mattooltip="diminuir a quantidade"]:eq(1)').click()
    cy.get('.valor:eq(1)').should('contain.text', 2*19)
    // Verificando subtotal e total
    cy.get('.subTotal:eq(0)').should('contain.text', 2*19)
    cy.get('.subTotal:eq(1)').should('contain.text', 2*19)
    cy.get('#total').should('contain.text', 4*19)
    // Fechando o carrinho
    cy.get('button[matTooltip="Fechar"]').click()
    cy.get('.mat-drawer-opened').should('not.exist')
  })

  it('Adicionar produto ao carrinho diminuido a quantidade ate chegar a 0(zero) dentro do carrinho', ()=>{
    // Montando o cenário
    cy.get(':nth-child(1) > mat-card > div > .mat-raised-button').click()
    cy.get('.modal-body > .col > .row > .product-name').should('contain.text', 'blue')
    cy.get('.modal-body > .col #quantidade').should('not.exist')
    cy.get('.modal-body > .col > .row > mat-chip:nth-child(2)').click()
    cy.get('.modal-body > .col #quantidade').should('exist')
    cy.get('.modal-body > .col > .mat-raised-button').click()
    cy.get('.modal-body').should('not.exist')
    cy.get('.mat-badge[ng-reflect-content="1"]').should('exist')
    // Abrindo o carrinho
    cy.get('.mat-badge[ng-reflect-content="1"]').click()
    cy.get('.mat-drawer-opened').its('length').should('be.eq', 1)
    // Verificando o dado do produto
    cy.get('.mat-drawer-opened .product-name').should('contain.text', 'blue')
    // Aumentado a quantidade
    cy.get('button[mattooltip="diminuir a quantidade"]').click()
    // Verificando se esta vázio
    cy.get('h4.ng-star-inserted').should('contain.text', 'You cart is empty')
    // Fechando o carrinho
    cy.get('button[matTooltip="Fechar"]').click()
    cy.get('.mat-drawer-opened').should('not.exist')
  })

})