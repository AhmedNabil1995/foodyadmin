import {getAddress} from './address';
const imgP = process.env.REACT_APP_SERVER_URL + 'images'

export const userColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "User",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${(params.row.image).startsWith('http')?params.row.image:imgP+'/'+params.row.image}`} alt="avatar" />
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 260,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
  ];

  export const mealColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "name",
      headerName: "Meal",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${(params.row.image).startsWith('http')?params.row.image:imgP+'/'+params.row.image}`} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "addons",
      headerName: "addons",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      renderCell:(params)=>{
          return ('Egp'+params.row.price)
      }
    },
    {
      field: "category",
      headerName: "category",
      width: 120,
    },
    {
      field: "cuisine",
      headerName: "cuisine",
      width: 120,
    },
  ];

  export const orderColumns = [
    {
      field:'_id',
      headerName: "Order ID",
      width: 220,
    },
    {
      field:'user',
      headerName: "Customer",
      width: 170,
      renderCell :(params)=>{
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${params.row.user?.image.startsWith('http')?params.row.user?.image:imgP+'/'+params.row?.user?.image}`} alt="avatar" />
            {`${params.row.user?.firstName} ${params.row.user?.lastName}`}
          </div>
        )
      }
    },
    {
      field:'createdAt',
      headerName: "Date",
      width: 130,
      renderCell :(params)=>{
        return (
          <span>{new Date(params.row.createdAt).toDateString()}</span>
        )
      }
    },
    {
      field:'amount',
      headerName: "Amount",
      width: 90,
      renderCell:(params)=>{
          return ('Egp'+params.row.amount)
      }
    },
    {
      field:'address',
      headerName: "Address",
      width: 280,
      renderCell :(params)=>{
        return (
          <span>{getAddress(params.row.user?.address)}</span>
        )
      }
    },
    {
      field:'payment',
      headerName: "payment method",
      width: 130,
      renderCell :(params)=>{
        return (
          <span>{params.row.methodOfPayment}</span>
        )
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        )
      },
    }
  ]
  
