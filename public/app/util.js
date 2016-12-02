Object.prototype.pushContent = function(element) {
        if(this.contents == null){
          this.contents = [element]
        }
        else{
          this.contents.push(element);
        }
}; 