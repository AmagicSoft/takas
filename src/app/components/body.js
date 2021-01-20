
import React from 'react';
import Navbar from './navbar';
//import Api from '../Api';
import io from 'socket.io-client';

class Body extends React.Component {
    connect = e => {
        e.preventDefault();
        this.connectSocket();

    }
    sendRoom = e => {
        e.preventDefault();
        this.socket.emit('SubastakasRoom', 100, { roomID: 'ronnySotillet' })
    }

    connectSocket = async () => {
        // try {
        //     const data = await Api('/test');
        //     console.log(data);
        // } catch (e) {
        //     console.log('error', e);
        // }
        this.socket = io();
        this.socket.on('members', (data) => {
            console.log(data);
        })
        // fetch(proxyUrl)
        //     .then(blob => blob.json())
        //     .then(data => {
        //         console.table(data);
        //         return data;
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         return e;
        //     });
    }


    render() {
        return (<div id="page-wrapper" className="gray-bg">
            <Navbar />
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>Agregar Cliente</h2>
                </div>
            </div>
            <div className="wrapper wrapper-content ">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>Cliente</h5>
                                <div className="ibox-tools">

                                </div>
                            </div>
                            <div className="ibox-content">
                                <button className="btn btn-w-m btn-primary" onClick={this.connect}>Connect</button>
                            </div>
                            <div className="ibox-content">
                                <button className="btn btn-w-m btn-primary" onClick={this.sendRoom}>sendRoom</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Body;



