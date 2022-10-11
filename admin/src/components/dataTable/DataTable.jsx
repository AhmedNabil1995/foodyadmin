import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser } from '../../redux/reducers/usersReducer';
import { deleteOrder } from '../../redux/reducers/orderReducer';
import { deleteMeal } from '../../redux/reducers/mealsReducer';


const DataTable = (props)=> {
  let {Rows,Cols} = props;
  let dispatch = useDispatch();
  let {admin} = useSelector(state=>state.auth);
  let path = props.path;



  const handleDelete = (id)=>{
    switch(path){
      case '/users':
        dispatch(deleteUser({admin,id}));
        break;
      case '/meals':
        dispatch(deleteMeal({admin,id}));
        break;
      case '/orders':
        dispatch(deleteOrder({admin,id}))
    }
  }


  const actionColumns = [
    {
        field:'action',
        headerName : 'action',
        width: 130,
        renderCell:(params)=>{
            return(
                <div className='action'>
                  <Link to={`${path==='/users'?'/users':path==='/meals'?'/meals':path==='/orders'?'/orders':'/'}/${params.row._id}`}>
                    <div className='view'>View</div>
                  </Link>
                    <div onClick={()=>handleDelete(params.row._id)} className='delete'>Delete</div>
                </div>
            )
        }
    }
]


  return (
    <div className='dataTable'>
        <div className='top'>
        <span className='title'>{props.title}</span>
        {path!== '/orders' &&<Link to={path=='/users'?'/addUser':path=='/meals'?'/addMeal':''}>
        <span className='add'>add New</span>
        </Link>}
        </div>
    
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        className='datagrid'
        rows={Rows}
        columns={Cols?.concat(actionColumns)}
        getRowId ={(row)=>row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}

      />
    </div>

    </div>
  )
}

export default DataTable