import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams, useLocation } from 'react-router-dom';
import './index.css'
import { FaPenSquare, FaTrashAlt } from 'react-icons/fa'
import api from '../../services/api';

interface mapProps {
    id: number,
    categoryId: number
    description: string;
    icmsTax: number;
    ipiTax: number;
    minPuchaseQuantity: number;
    isAvailable: boolean;
    name: string;           
    isWarehouse: boolean;
}

function Produto(){
    const [dataP, setDataP] = useState<any[]>([])
    const [haveData, setHaveData] = useState(true)
    const [itensPerPage, setItensPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [deleteOk, setDeleteOk] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")


    const searchLower = search.toLowerCase()
    const location = useLocation()
    const { catName } = location.state || ""
    const { id } = useParams();
    const pages = Math.ceil(dataP.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = dataP.slice(startIndex, endIndex)
    const newCurrentItens = currentItens.filter((obj) => obj.name.toLowerCase().includes(searchLower))
    


    useEffect(()=>{
        setItensPerPage(6)
        async function dadosProCat(){
            await api.get("Product")
            .then(({data})=>{
                const prodFilter = data.filter((e:any)=>{return e.categoryId.toString() === id})
                setDataP(prodFilter)
                setDeleteOk(false)    
                if(data[0].id){
                    if(!prodFilter[0]){ 
                        setLoading(false)
                        setHaveData(false)
                    }else{
                        setHaveData(true)
                        setLoading(false)
                    }

                }
            }).catch((r)=>{
                setLoading(false)
                setHaveData(false)
            })
        }
        dadosProCat()
    },[deleteOk, haveData, loading, catName, id])

    const deleteData = async (idDel:number) => {
        await api.delete(`Product/${idDel}`)
        .then((r)=>{
            toast.success("Produto deletada com sucesso!")
            setDeleteOk(true)
        }).catch((r)=>{
            toast.error(`Erro:${r.response.status} - Não foi possivel deletar...`)
        })

    }

    if(loading){
        return(
            <div className='bodyPro'>
                <div className='init'>
                    <h2>Carregando produtos...</h2>
                    <Link to={'/produto/create'}>Novo Produto</Link>
                </div>
            </div>
        )
    }
    if(!haveData){
        return(
            <div className='bodyPro'>
                <div className='init'>
                    <div>
                        <h2>Nenhum produto cadastrado</h2><br />
                        <h2>Categoria: {location.state.name?location.state.name:catName}</h2>
                    </div>
                    <Link to={'/produto/create'} state={{idCategory:id, catName: catName}} >Novo Produto</Link>
                </div>
            </div>
        )
    }

    return(
        <div className='mainPro'>
            <input type="text" className='search' placeholder='Pesquisar produto' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <div className='bodyPro'>
                <div className='init'>
                    <h2>Produtos da categoria: {location.state.name?location.state.name:catName}</h2>
                    <Link to={'/produto/create'} state={{idCategory:id, catName: catName, catNameRet: location.state.name}} >Novo Produto</Link>
                </div>
                <div className='divMapPro'>
                    {newCurrentItens.map((pro:mapProps, index) => {
                        return(
                            <div key={index} className='cardPro'> 
                                <article className='cardArt'>
                                    <h3>{pro.name}</h3>
                                    <p>{pro.description}</p>
                                    <div className='quebra'>
                                        <div className='quebra1'>
                                            <p>Quantidade minima de compra:</p>
                                            <p>Disponivel:</p>
                                            <p>ICMS:</p>
                                            <p>IPI:</p>
                                            <p>Em estoque:</p>
                                        </div>
                                        <div className='quebra2'>
                                            <p>{pro.minPuchaseQuantity}</p>
                                            <p>{pro.isAvailable ? "Sim" : "Não"}</p>
                                            <p>{pro.icmsTax}%</p>
                                            <p>{pro.ipiTax}%</p>
                                            <p>{pro.isWarehouse ? "Sim" : "Não"}</p>
                                        </div>
                                    </div>
                                    <div className='divButOpc'>
                                        <Link to={`/produto/update/${pro.id}`} state={{nameProduct : pro.name, idCategory:id, catName: catName, catNameRet: location.state.name}} ><FaPenSquare className='ic'/>Editar</Link>
                                        <button onClick={()=>deleteData(pro.id)}><FaTrashAlt className='ic'/>Deletar</button>
                                    </div>
                                </article>
                            </div> 
                        )
                    })}
                </div>
                <div className='divButPage'>
                    {Array.from(Array(pages), (item, index):any =>{
                        return <button key={index} value={index} onClick={(e):any=>setCurrentPage(Number((e.target as HTMLInputElement).value))} >{index+1}</button>
                    })}
                </div>
            </div>
        </div>
    )

}

export default Produto;
