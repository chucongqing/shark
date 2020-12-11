class TreeData {
    title:string;
    uid:string;
    parentUid:string;

    children : TreeData[];
    constructor(title:string, uid :string){
        this.title = title
        this.uid = uid
        this.parentUid = ""
        this.children = [];
    }

    SetParent(uid:string) : void{
        this.parentUid = this.parentUid
    }

    AddChild(td :TreeData) {
        this.children.push(td)
    }

    Delete(){
        //get parent and delete from it
        //delete all it's children
    }
}

export default TreeData;