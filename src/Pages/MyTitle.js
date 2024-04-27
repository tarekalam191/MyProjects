import React from "react";
class MyTitle extends React.Component{
    constructor(props){
        super();
    }
    render(){
        return(
            <>
             <h1 className={`text-center text-${this.props.textColor}`}>{this.props.testTitle}</h1>
            </>
        )
    }
}
export default MyTitle;