import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from  'react-router-dom';

import Message from './Message';

class ThreadView extends Component{

    componentDidMount(){
        this.init();
    }

    componentDidUpdate(props){
        if(props.match.params.threadId!==this.props.match.params.threadId){
            this.init();
    }}

    init=()=>{
        let currentThread=this.props.threads.filter(t=>t.id===this.props.match.params.threadId)[0];
        console.log("in init");
        if(currentThread && this.props.socket.readyState){
            console.log("in  thread");
            let skip=currentThread.Messages||0;
            this.props.socket.send(JSON.stringify({
                type:'THREAD_LOAD',
                data:{
                    threadId:this.props.match.params.threadId,
                    skip:skip
                }
            }))
        }

    }
    render(){
       
        return (
           
            <div className="main-view neomorphic-shadows-i m-10 " id='main-view'>
                {this.props.threads.filter(thread => thread.id===this.props.match.params.threadId)
                .map((thread,i)=>{
                    
                    return (
                        <div className="message-container" key={i}>
                            {thread.Message && thread.Message.map((msg,mi)=>{
                                if(msg){
                                return(
                                    <Message msg={msg} key={mi}/>
                                )
                            }
                            })}

                        </div>
                    )
                })
            }
            </div>
        )
    }
}

const mapStateToProps= (state) => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = (dispatch) =>({

})

export default connect(mapStateToProps, mapDispatchToProps)
(withRouter(ThreadView));