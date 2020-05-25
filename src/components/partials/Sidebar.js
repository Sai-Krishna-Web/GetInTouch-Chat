import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from  'react-router-dom';

class Sidebar extends Component{
    state={
        search:''
    }

    search=()=>{
        this.props.socket.send(JSON.stringify({
            type:'SEARCH',
            data:this.state.search
        }))
    }
    findOrCreateThread=(id)=>{
        this.props.socket.send(JSON.stringify({
            type:'FIND_THREAD',
            data:[this.props.user.id,id]
        }))
    }
    render(){
        return (
            <div className="sidebar neomorphic-shadows-i m-10">
                <form className="search-container neomorphic-shadows neomorphic-shadows-hover" onSubmit={e=>{this.search()}}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={this.state.search}
                            onChange={e=>{this.setState({search:e.target.value});}}
                        />
                        <button className="btn-none btn-search input-group-append" onClick={e=>{this.search()}}>
                        <i className="zmdi zmdi-search" />
                        </button>
                    </div>
                    
                </form>
               {this.state.search?
                  <ul className="thread-list">
                  <label>Resuts</label>
                  {this.props.users && 
                  this.props.users.filter(u=>u.id!==this.props.user.id).map((user, ui)=>{
                      return(
                        <li key={ui} className="neomorphic-shadows neomorphic-shadows-hover">
                            <a href="" onClick={e=>{
                                e.preventDefault();
                                this.findOrCreateThread(user.id);
                            }}><div>
                                <i className="zmdi zmdi-account-circle"/>
                                <h5>{user.name}</h5>
                                <p>{user.email}</p>
                                </div>
                            </a>
                        </li>
                 
                      )
                  })}
               </ul>
               :
             
               <ul className="thread-list">
                   <label>Messages</label>
                   {this.props.threads.map((thread, threadIndex)=>{
                       return(
                        <li key={threadIndex} >
                            <div className="neomorphic-shadows neomorphic-shadows-hover">
                                <Link to={`/${thread.id}`} >
                                    
                                    {thread.profiles && thread.profiles.filter(p=> p.id!==this.props.user.id).map(profile=>{
                                        return(
                                        <>
                                        <i className="zmdi zmdi-account-circle"/>
                                        <h5>{profile.name}</h5>
                                        <p>{profile.email}</p>
                                        </>
                                        )
                                    })}
                                    
                                </Link>
                        </div>
                        </li>
                        )
                   })}
               </ul>
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
(withRouter(Sidebar));