import React from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

import PageTitle from '../../components/PageTitle';
import axios from 'axios'; 

var datatableData = [];

const columns = [
	{
	name: "displayName",
	label: "Pie Name",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "quantity",
	label: "Quantity",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "price",
	label: "Price",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "displayName2",
	label: "Store Name",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "address",
	label: "Address",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "rating",
	label: "Rating",
	options: {
	filter: true,
	sort: true,
	}
	},
	{
	name: "mobile",
	label: "Contact Number",
	options: {
	filter: true,
	sort: true,
	}
	},
];

// Get data from the provided api
class Tables extends React.Component {
	constructor(props){
	    super(props);
	    this.state={
	      isLoaded:false,
	    }
  	}

  	componentDidMount()
  	{
	    const _this=this;

	    // Get Pies and stores data
	    axios.all([
	     axios.get('https://pie.now.sh/pies'),
	     axios.get('https://pie.now.sh/stores')
	   ])
	    .then(axios.spread(function (pieResp, storesResp) {
			for(var i in pieResp.data){
				for(var j in storesResp.data){
					if(pieResp.data[i].storeId == storesResp.data[j].id)
					{
						// Combine them into one json
						var item = {
							displayName : pieResp.data[i].displayName,
							quantity: pieResp.data[i].quantity,
							price: pieResp.data[i].priceString,
							displayName2: storesResp.data[j].displayName,
							address: storesResp.data[j].address,
							rating: storesResp.data[j].rating,
							mobile: storesResp.data[j].mobile
						};
						datatableData[i]=item;
						break;
					}
				}
			}
	        _this.setState({
		        isLoaded:true
	        });
	    }))
	    .catch(function (error) {
	        console.log(error);
	        _this.setState({
		        isLoaded:false,
		        error:error
		    })
	    })
    }

  render(){
        if(!this.state.isLoaded){
        	return <div>Loading</div>
        }
        else{
	      	// display data
	      	return (
		 		<MUIDataTable
		          title="Pie List"
		          data={datatableData}
		          columns={columns}
		          options={{
		            filterType: 'checkbox',
		            rowsPerPageOptions: [5, 10, 15],
		          }}
		        />
		    )
        }
  }
}

export default Tables;