import TreeData from "./treedata"

class TreeDataManager {
    treeDatas : TreeData[]
    
    constructor(){
        this.treeDatas = []
    }

    AddTreeData(td : TreeData) {
        if(td == null) {
            console.error("tdm: added tree data is null");
            return;
        }
            
        this.treeDatas.push(td)
    }
}

export default TreeDataManager;