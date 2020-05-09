import React , { useState, useEffect  } from 'react'
import  {Tree, Input, } from 'antd';
import { DataNode , Key} from 'rc-tree/lib/interface'
import { ModelMeta } from 'app/types';
import axios from 'axios'
const { Search } = Input;

const dataList: ModelMeta[] = []

// const gData : DataNode[] = [
//     {
//         key:"0",
//         title:"a",
//         children: [
//             {
//                 key:"0-1",
//                 title:"a-1",
//             },
//             {
//                 key:"0-2",
//                 title:"a-2",
//             }
//         ]
//     },
//     {
//         key:"1",
//         title:"bbbbbbb"
//     },
//     {
//         key:"2",
//         title:"bbbbbbb22222"
//     }

// ];


type STState = {
    searchValue:string;
    expandedKeys : string[];
    autoExpandParent : boolean;
    gData : DataNode[];
} 

const defaultState : STState = {
    searchValue : "",
    autoExpandParent:true,
    expandedKeys:[],
    gData : [],
}
const getParentKey : (key:Key, tree:DataNode[])=> Key|null = (key , tree) => {
    let parentKey : Key | null = null;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };


const SearchTree = ()=>{

    const [state,setState] = useState<STState>(defaultState);

    async function GetModelJson() {
        const resp = await axios.get("api/BundleLib.json")
        const data = resp.data
        const industryData = data.data.industry as object[]
        const customData = data.data.custom
        
        // console.log(data)
        

        function gendata( arr : object[], garr: DataNode[]) : DataNode[] {
            arr.forEach( (obj : any) => {
                let gd : DataNode = {
                    key:""
                }

                if(obj.children === undefined){
                    gd = {
                        title : obj.title,
                        key : obj.id,
                    }
                }
                else{
                    let c : DataNode[] = []
                    c = gendata(obj.children, c);
                    gd = {
                        title : obj.title,
                        key : obj.id,
                        children: c
                    }
                }
                
                garr.push(gd)
                
            })
            return garr;
            
        }

        let gData : DataNode[] =  gendata(industryData, [])
     
        console.log(gData)

        setState({
            ...state,
            gData:gData
        })
        
    }
    useEffect(() => {
        GetModelJson();
    }, [])

    const onExpand = (_expandedKeys : Key[]) => {
        setState( {
            ...state,
            expandedKeys : _expandedKeys as string[],
            autoExpandParent:false
            }
        );
    }

    const onChange = (e : React.ChangeEvent<HTMLInputElement> )=> {
        const {value} = e.currentTarget;
        const {gData} = state;

        const _expandedKeys = gData.map(item => {
            if( (item.title as string). indexOf(value) > -1 ) {
                return getParentKey(item.key, gData);
            }
            return null
        }).filter((value, index, selfArr)=>{
            return value && selfArr.indexOf(value) === index
        })

        if(_expandedKeys != null){
            setState({
                ...state,
                expandedKeys: _expandedKeys as string[],
                searchValue:value,
                autoExpandParent:true
            })
        }
        
    }

    const { searchValue, expandedKeys, autoExpandParent } = state;
    const loop : (d:DataNode[])=>DataNode[] = (data : DataNode[])  =>{
        return data.map((item : DataNode)=>{
           
            const index = (item.title as string).indexOf(searchValue)
            const beforeStr = (item.title as string).substr(0,index);
            const afterStr = (item.title as string).substr(index + searchValue.length);

            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span>{searchValue}</span>
                    {afterStr}
                </span>
            ) :(
                <span>{item.title}</span>
            )

            if( item.children) {
                return  {
                    key : item.key,
                    title :  title,
                    children : loop(item.children)
                };
            }
            
            return {
                key: item.key,
                title: title
            }
        })
    }
    return (
        <div>
            <Search style={{marginBottom:8}} placeholder="search"
               onChange={onChange} ></Search>
            <Tree 
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(state.gData)}
            ></Tree>
        </div>
    )
}


export default SearchTree