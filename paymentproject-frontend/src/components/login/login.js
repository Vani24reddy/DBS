import React, { useState } from 'react';

function LoginComponent(props) {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [errmsg,setErrmsg]=useState('');

    const usernameChangeHandler=(event)=>{
        setUsername(event.target.value);
        setErrmsg('');
    }
    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
        setErrmsg('');
    }
    const next=(e)=>{
        e.preventDefault();
        if(username==='Vani' && password==="Vani@19"){
        props.history.push('/LandingPage');
        }
        else
        setErrmsg("Credentials Invalid");
    }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Login</h3>
                            <h5 className="text-center text-danger">{errmsg}</h5>
                            <div className="card-body">
                                <form onSubmit={next}>
                                    <div className="form-group">
                                        <label>User Name : </label>
                                        <input placeholder="enter username" name="username" className="form-control"
                                        value={username} onChange={usernameChangeHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>password : </label>
                                        <input type="password" placeholder="enter password" name="password" className="form-control"
                                        value={password} onChange={passwordChangeHandler}/>
                                    </div>
                                     <button type="submit" className="btn-success">login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}


export default LoginComponent;