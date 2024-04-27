import React from "react";


class MyButton extends React.Component{
    constructor(props){
        super();

    }
    render(){
       return(
        <>

             <button className={`btn ${this.props.buttonColor}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main"
              aria-controls="main"
              aria-expanded="false"
              aria-label="Toggle navigation" width="200px">
                {this.props.test}
              </button>
        </>
      )

    } 
}
export default MyButton;
