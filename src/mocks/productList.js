const productList = [
{category:"001",id:"1",name:"remera",image:"images/remera.jpg",description:"remera mangas cortas de alta calidad",price:1500,stock:50,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pichu',modelo:'1'},
{category:"001",id:"2",name:"remera",image:"images/remera.jpg",description:"remera mangas cortas de alta calidad",price:1700,stock:5,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pichu',modelo:'1'},
{category:"001",id:"3",name:"remera",image:"images/remera.jpg",description:"remera mangas cortas de alta calidad",price:1800,stock:40,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pichu',modelo:'1'},
{category:"001",id:"4",name:"remera",image:"images/remera.jpg",description:"remera mangas cortas de alta calidad",price:1200,stock:15,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pichu',modelo:'1'},
{category:"002",id:"20",name:"pantalón",image:"images/pantalon.jpg",description:"pantalón elastizado",price:2000,stock:30,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pantaleon',modelo:'2'},
{category:"002",id:"21",name:"pantalón",image:"images/pantalon.jpg",description:"pantalón elastizado",price:2500,stock:33,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pantaleon',modelo:'2'},
{category:"002",id:"22",name:"pantalón",image:"images/pantalon.jpg",description:"pantalón elastizado",price:2800,stock:60,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pantaleon',modelo:'2'},
{category:"002",id:"23",name:"pantalón",image:"images/pantalon.jpg",description:"pantalón elastizado",price:2900,stock:12,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'pantaleon',modelo:'2'},
{category:"003",id:"30",name:"zapatillas",image:"images/zapatillas.jpg",description:"zapatillas deportivas",price:5000,stock:10,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'zapa',modelo:'3'},
{category:"003",id:"31",name:"zapatillas",image:"images/zapatillas.jpg",description:"zapatillas deportivas",price:6000,stock:8,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'zapa',modelo:'3'},
{category:"003",id:"32",name:"zapatillas",image:"images/zapatillas.jpg",description:"zapatillas deportivas",price:6500,stock:5,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'zapa',modelo:'3'},
{category:"003",id:"33",name:"medias",image:"images/medias.jpg",description:"medias cortas de alta calidad",price:500,stock:50,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'media',modelo:'4'},
{category:"005",id:"40",name:"gorra",image:"images/gorra.jpg",description:"gorra con cierre ajustable",price:1500,stock:2,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'gorro',modelo:'5'},
{category:"005",id:"41",name:"gorra",image:"images/gorra.jpg",description:"gorra con cierre ajustable",price:2500,stock:20,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'gorro',modelo:'5'},
{category:"005",id:"42",name:"gorra",image:"images/gorra.jpg",description:"gorra con cierre ajustable",price:1000,stock:26,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'gorro',modelo:'5'},
{category:"005",id:"43",name:"gorra",image:"images/gorra.jpg",description:"gorra con cierre ajustable",price:1250,stock:41,envio:"a todo el país",talle:'Único 38 a 44',color:'Negro',tela:'Liso',marca:'gorro',modelo:'5'}
];
 /* consumiendo apis clase 7: */
  /* useEffect(()=>{
fetch("https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=Samsung&limit=5000")
.then(result => {
    return result.json()
}).then(value => {
    //Guardamos en un state
    console.log(value);
}).catch(error => {
    console.log(error);
})
return () => {}
},[]) */
  /* fin clase 7 */
//parametro es un valor que se le pasa a una funcion
//un callback es una funcion que se ejecuta cuando algo pasó,
//es un evento que ejecuta el componente y le evuelve el valor al padre

//componentes de presentacion: generalmente son elementos como botones o inputs
//que no tienen una funcionalidad logca, no matan componentes, etc, por ej: ButtonComponent

/* componentes contenedores: son contrarios a los depresentacion, contienen la logica de la web
y contienen a muchos contenedores hijos, que son de presentacion */

//consultas a base de datos siempre van adentro de useEffect, con async await y promesas

//las keys se usan solo cuando usamos .map en los componentes

export default productList;