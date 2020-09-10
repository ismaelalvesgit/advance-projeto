import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

interface Produto{
  nome: string
  foto: string
  tamanhos: Array<String>,
  valor: number,
  cor: string
}

interface Carrinho{
  produto: Produto
  quantidade: number
  tamanho: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos:Array<Produto> = [
    {
      nome: "Tes-tee blue cotton shit",
      foto: "/assets/blue-tee.png",
      tamanhos: [
        "XS",
        "M",
        "S"
      ],
      valor: 19,
      cor: "blue"
    },
    {
      nome: "Tes-tee white cotton shit",
      foto: "/assets/white-tee.png",
      tamanhos: [
        "XXL",
        "M",
        "S"
      ],
      valor: 19,
      cor: "white"
    },
    {
      nome: "Tes-tee orange cotton shit",
      foto: "/assets/orange-tee.png",
      tamanhos: [
        "XL",
        "XXL",
        "L"
      ],
      valor: 19,
      cor: "orange"
    }
  ]
  produtoCarrinho:Array<Carrinho> = []
  produtoFilter: any = { nome: '', cor:'', tamanhos:[]};
  produto:Produto
  carrinho:Carrinho
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}
  
  ngOnInit() {
    
  }

  openModal(template: TemplateRef<any>, produto:Produto) {
    this.produto = produto
    this.carrinho = {produto: produto, quantidade: 1, tamanho: ''}
    this.modalRef = this.modalService.show(template);
  }

  corFilter(valor:string){
    this.produtoFilter.cor = valor
  }

  sizeFilter(valor:string){
    this.produtoFilter.tamanhos = [valor]
  }

  removeQntModal(){
    if(this.carrinho.quantidade == 1){
      this.modalRef.hide()
    }else{
      this.carrinho.quantidade--
    }
  }

  addQntModal(){
    this.carrinho.quantidade++
  }

  addSizeModal(valor:string){
    if(this.produto.tamanhos.includes(valor)){
      this.carrinho.tamanho = valor
    }else{
      this.modalRef.hide()
    }
  }

  addProductByCart(){
    const index = this.produtoCarrinho.findIndex((i)=> i.produto.nome === this.carrinho.produto.nome && i.tamanho === this.carrinho.tamanho)
    console.log(index)
    if(index != -1){
      this.produtoCarrinho[index].quantidade+=this.carrinho.quantidade
      console.log(this.produtoCarrinho)
    }else{
      this.produtoCarrinho.push(this.carrinho)
    }
    this.modalRef.hide()
  }

  removeQntCart(i:number){
    if(this.produtoCarrinho[i].quantidade == 1){
      this.produtoCarrinho.splice(i, 1)
    }else{
      this.produtoCarrinho[i].quantidade-- 
    }
  }

  addQntCart(i:number){
    this.produtoCarrinho[i].quantidade++
  }

  total(){
    let total = 0
    this.produtoCarrinho.forEach((item)=>{
      total += item.quantidade * item.produto.valor
    })
    return total
  }

}
