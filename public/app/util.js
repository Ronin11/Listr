function pushContent(obj, element){
    if(obj.contents == null){
        obj.contents = [element]
    }
    else{
        obj.contents.push(element);
    }
}
