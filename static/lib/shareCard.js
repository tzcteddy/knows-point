function ShareCard(options){
  //海报宽度
  this.width=options.width;
  //海报高度
  this.height=options.height;
  //海报背景图
  this.backgroundImageEl=options.backgroundImageEl;
  //海报内容参数
  this.props=options.props;
  this.ratio=1;

  this.canvas=null;
  this.context=null;
  this.createCanvas();
  this.getRatio()
}

ShareCard.prototype.getRatio=function(){
var  devicePixelRatio = window.devicePixelRatio || 1,   
   backingStoreRatio = this.context.webkitBackingStorePixelRatio || this.context.mozBackingStorePixelRatio || this.context.msBackingStorePixelRatio || this.context.oBackingStorePixelRatio || this.context.backingStorePixelRatio || 1; 
   this.ratio = devicePixelRatio / backingStoreRatio; 
}
ShareCard.prototype.createCanvas=function(){
if(this.canvas)return;
this.canvas = document.createElement("canvas"),
this.context=this.canvas.getContext("2d");
}
ShareCard.prototype.drawBackground=function(){
if(this.backgroundImageEl){
  console.log(this.backgroundImageEl)
  this.width=this.backgroundImageEl.width
  this.height=this.backgroundImageEl.height
  console.log(this.width)
  this.canvas.width =this.width*this.ratio;
  this.canvas.height = this.height*this.ratio;
  this.drawImage({
    img:this.backgroundImageEl,left:0,top:0,width:this.width,height:this.height
  })
}

}
ShareCard.prototype.drawImage=function({img,left,top,width,height}){
console.log({img,left,top,width,height})
let ratio=this.ratio
this.context.drawImage(img,left*ratio,top*ratio,width*ratio,height*ratio);
}
ShareCard.prototype.drawText=function({text,fillStyle,font,textAlign,left,top}){
let ratio=this.ratio
this.context.fillStyle = fillStyle||'4b3a96';   // 文字填充颜色
this.context.font = font+' Baoli SC';
this.context.textAlign = textAlign||'right';
this.context.fillText(text,left * ratio,top * ratio);
// this.context.stroke();
}
ShareCard.prototype.start=function(){
this.drawBackground()
this.props.forEach(prop=>{
  if(prop.type==="image"){
    this.drawImage(prop)
  }
  if(prop.type==='text'){
    this.drawText(prop)
  }
})
return this.export()
}
ShareCard.prototype.export=function(){
return this.canvas.toDataURL();
}