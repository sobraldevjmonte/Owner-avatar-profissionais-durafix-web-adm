(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{667:function(t,o,e){"use strict";e.r(o);var n=e(513),r=e(377),d=e(541),l=e(539),c=e(493),_=e(429),m=e(565),v=e(490),h=e(471),f=e(22),x=(e(90),e(34),e(6),e(44),e(23),e(49),e(253),e(91)),k=e.n(x),I={data:function(){return{subtitulo:"Vendas Item",id_produto:0,codigo_codigo:0,descricao_produto:"",imagem_produto:"",valor_produto:0,tamanhos:[],cores:[],idUsuario:0,valor_padrao:0,quantidade_venda:1,total_item:0,venda_atual:0,venda_existe:!1,dados:[],host:"http://10.5.59.107:6002/",pontos:0,id_tamanho:0,sigla_tamanho:"",tamanhos_produtos_linhas:0,tamanhos_produtos:[],tamanho_selecionado:0,pontos_item:0,msgErroTamanho:""}},mounted:function(){this.getIdProduto(),this.getLogado(),this.getProduto(),this.getVendaAtual()},methods:{selecionarTamanho:function(t,p){this.tamanho_selecionado=t,this.pontos_item=p},getVendaAtual:function(){var t=this;return Object(f.a)(regeneratorRuntime.mark((function o(){var e,u;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,k.a.get("".concat(t.host,"vendas/ultimavenda/").concat(t.idUsuario));case 2:e=o.sent,u=e.data.venda.id_venda,e.data.venda.linhas>0?(t.venda_existe=!0,t.venda_atual=u):t.venda_atual=u+1;case 6:case"end":return o.stop()}}),o)})))()},salvarItem:function(){var t=this;return Object(f.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(t.dados={id_venda:t.venda_atual,id_usuario:t.idUsuario,id_produto:t.id_produto,quantidade_venda:t.quantidade_venda,valor_produto:t.valor_produto,total_item:t.total_item,venda_existe:t.venda_existe,pontos_item:t.pontos_item},!0!==t.venda_existe){o.next=11;break}if(0!==t.tamanho_selecionado){o.next=7;break}return t.msgErroTamanho="Selecione um tamanho!",o.abrupt("return",!1);case 7:return o.next=9,k.a.put("".concat(t.host,"vendas/salvarItem/"),t.dados,{headers:{"Content-Type":"application/json"}});case 9:o.next=19;break;case 11:if(!1!==t.venda_existe){o.next=19;break}if(0!==t.tamanho_selecionado){o.next=17;break}return t.msgErroTamanho="Selecione um tamanho!",o.abrupt("return",!1);case 17:return o.next=19,k.a.post("".concat(t.host,"vendas/salvarItem"),t.dados,{headers:{"Content-Type":"application/json"}});case 19:t.voltar();case 20:case"end":return o.stop()}}),o)})))()},voltar:function(){this.$router.push("/vendas")},calculaTotalItem:function(){var t=this.valor_produto.toString().replace(",","."),o=this.quantidade_venda.toString().replace(",","."),e=parseFloat(o)*parseFloat(t);t>0&&o>0?(this.total_item=parseFloat(e.toFixed(2)),this.valor_produto=t,this.quantidade_venda=o):(this.quantidade_venda=1,this.valor_produto=this.valor_padrao)},incrementaProduto:function(){var t=this.valor_produto.toString().replace(",","."),q=this.quantidade_venda,o=(q=(++q).toString()).replace(",","."),e=parseFloat(o)*parseFloat(t);t>0&&o>0?(this.total_item=parseFloat(e.toFixed(2)),this.valor_produto=t,this.quantidade_venda=o):(this.quantidade_venda=1,this.valor_produto=this.valor_padrao)},decrementaProduto:function(){var t=this.valor_produto.toString().replace(",","."),q=this.quantidade_venda,o=(q=(--q).toString()).replace(",","."),e=parseFloat(o)*parseFloat(t);t>0&&o>0?(this.total_item=parseFloat(e.toFixed(2)),this.valor_produto=t,this.quantidade_venda=o):(this.quantidade_venda=1,this.valor_produto=this.valor_padrao)},getLogado:function(){this.token=sessionStorage.getItem("idusuario"),this.logado=sessionStorage.getItem("logado"),this.nivelUsuario=sessionStorage.getItem("nivelUsuario"),this.idUsuario=sessionStorage.getItem("idUsuario")},getProduto:function(){var t=this;return Object(f.a)(regeneratorRuntime.mark((function o(){var e,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,k.a.get("".concat(t.host,"produtos/").concat(t.id_produto));case 2:e=o.sent,data=e.data.produtos,t.id_produto=data.id_produto,t.codigo_codigo=data.codigo,t.descricao_produto=data.descricao_produto,t.valor_produto=data.valor,t.imagem_produto="img_produtos/"+data.imagem,t.valor_padrao=data.valor,t.pontos=data.pontos,t.id_tamanho=data.id_tamanho,t.sigla_tamanho=data.sigla_tamanho,t.descricao_tamanho=data.descricao_tamanho,t.tamanhos_produtos_linhas=data.tamanhos_produtos,t.tamanhos_produtos=data.tamanhos_produtos,t.pontos_item=0,t.tamanho_selecionado=0,t.calculaTotalItem();case 19:case"end":return o.stop()}}),o)})))()},confirmaItem:function(t){sessionStorage.setItem("itemLancar",t),this.$router.push("/vendas_item")},getIdProduto:function(){this.id_produto=sessionStorage.getItem("itemLancar")}}},y=e(78),component=Object(y.a)(I,(function(){var t=this,o=t._self._c;return o("div",[o("h3",[t._v("Nº Venda: "+t._s(t.venda_atual))]),t._v(" "),o("br"),t._v(" "),o(r.a,{staticClass:"d-flex justify-center"},[o(m.a,[o(d.a,{staticClass:"text-sm-body-1 text-md-body-2 text-uppercase pl-5 pt-5",attrs:{cols:"12",align:"left"}},[t._v(t._s(t.descricao_produto))]),t._v(" "),o(d.a,{attrs:{cols:"12",align:"center"}},[o(_.a,{staticClass:"pa-0 ma-0",attrs:{align:"center",src:t.imagem_produto,"max-height":"250","max-width":"250"}}),t._v(" "),o("br")],1),t._v(" "),o(d.a,{staticClass:"text-sm-body-1 text-md-body-2 text-uppercase pa-5",attrs:{cols:"12",align:"left"}},[t._v("R$ "+t._s(t.valor_padrao))])],1)],1),t._v(" "),o("br"),t._v(" "),[o("div",[o(m.a,{attrs:{justify:"start"}},[o(d.a,{staticClass:"text-sm-body-1 text-md-body-2 pt-5 ver",attrs:{cols:"2"}},[t._v("Tam:\n        ")]),t._v(" "),t._l(t.tamanhos_produtos,(function(e){return o(d.a,{key:e.id_tamanho,attrs:{cols:"2"},on:{click:function(o){return t.selecionarTamanho(e.id_tamanho,e.pontos)}}},[o(n.a,{attrs:{dense:""}},[t._v(t._s(e.sigla_tamanho))])],1)}))],2)],1)],t._v(" "),o("br"),t._v(" "),o(l.a,{attrs:{"lazy-validation":""}},[o(m.a,[o(d.a,{staticClass:"pb-0 pt-0 mt-0 mb-0",attrs:{cols:"4",sm:"4",lg:"2"}},[o(h.a,{attrs:{type:"","error-count":"",placeholder:"",label:"Valor","append-icon":"",outlined:"",color:"",dense:"",case:""},on:{keyup:function(o){return t.calculaTotalItem()}},model:{value:t.valor_produto,callback:function(o){t.valor_produto=o},expression:"valor_produto"}})],1),t._v(" "),o(d.a,{attrs:{cols:"1"}}),t._v(" "),o(d.a,{staticClass:"pa-2",attrs:{cols:"1"}},[o(c.a,{staticClass:"red--text",on:{click:function(o){return t.decrementaProduto()}}},[t._v("\n          remove\n        ")])],1),t._v(" "),o(d.a,{staticClass:"pb-0 pt-0 mt-0 mb-0",attrs:{cols:"4",sm:"4",lg:"2"}},[o(h.a,{attrs:{type:"","error-count":"",placeholder:"",label:"Quant.","append-icon":"",outlined:"",color:"",dense:"",case:""},on:{keyup:function(o){return t.calculaTotalItem()}},model:{value:t.quantidade_venda,callback:function(o){t.quantidade_venda=o},expression:"quantidade_venda"}})],1),t._v(" "),o(d.a,{staticClass:"pa-2",attrs:{cols:"1"}},[o(c.a,{staticClass:"blue--text",on:{click:function(o){return t.incrementaProduto()}}},[t._v(" add ")])],1),t._v(" "),o(d.a,{staticClass:"pb-0 pt-0 mt-0 mb-0",attrs:{cols:"12",sm:"4",lg:"2"}},[t._v("\n        Total do item: R$ "+t._s(t.total_item)+"\n      ")])],1),t._v(" "),o("br"),t._v(" "),[o("div",[o(m.a,[o(d.a,{staticClass:"pb-1 pt-0 mt-0 mb-0",attrs:{cols:"12",sm:"6",md:"3",lg:"2",align:"center"}},[o(n.a,{attrs:{block:"",fullscreen:"",elevation:"5",color:"success mr-2"},on:{click:function(o){return t.salvarItem()}}},[t._v("\n              Incluir Item\n            ")])],1),t._v(" "),o(d.a,{staticClass:"pb-1 pt-0 mt-0 mb-0",attrs:{cols:"12",sm:"6",md:"3",lg:"2",align:"center"}},[o(n.a,{attrs:{block:"",fullscreen:"",elevation:"5",color:"warning"},on:{click:function(o){return t.voltar()}}},[t._v("\n              Voltar\n            ")])],1)],1)],1)],t._v(" "),""!=t.msgErroTamanho?o(v.a,{attrs:{timeout:4e3,value:!0,absolute:"",bottom:"",color:"red",center:""}},[t._v("\n      "+t._s(t.msgErroTamanho)+"\n    ")]):t._e()],2)],2)}),[],!1,null,null,null);o.default=component.exports}}]);