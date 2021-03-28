import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/action';
import axios from 'axios'; 


class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            intialRange: 0,
            maxRange: 5
        }
    }
    componentDidMount() {
        this.props.gettingUserDetails(this.state.intialRange, this.state.maxRange); 
    }
    componentDidUpdate(prevProps) {
        if (prevProps.getUserDetails !== this.props.getUserDetails) {
            this.setState({
                data: this.props.getUserDetails
            })
        }
    }
    changeTheData(e, type) {
        if (type === "prev state") {
            this.setState({
                intialRange: this.state.intialRange - 5,
                maxRange: this.state.maxRange - 5
            }, () => {
                this.props.gettingUserDetails(this.state.intialRange, this.state.maxRange);
            })
        }
        if (type == "next state") {
            this.setState({
                intialRange: this.state.intialRange + 5,
                maxRange: this.state.maxRange + 5
            }, () => {
                this.props.gettingUserDetails(this.state.intialRange, this.state.maxRange);
            })
        }
    }
    removeRow(e, data) { 
        const newState = this.state;
        const index = newState.data.findIndex(a => a.id === data);

        if (index === -1) return;
        newState.data.splice(index, 1);

        this.setState(newState);
    }
    render() {
        return (
            <div>
                <div>
                    <h3 className="hdgName">User List</h3>
                    <div className="dspflxhd">
                        <div className="userListId">Id</div>
                        <div className="userListAlbumId">Album Id</div>
                        <div className="userListTitle">title</div>
                        <div className="userListImage">Image</div>
                        <div className="userListActions">Actions</div>
                    </div>
                    <div className="tblhd">
                        {
                            this.state.data ? this.state.data.map((data, index) => {
                                return (<div key={data.id} className="dspflxbd">
                                    <div className="userListId">
                                        <p>{data.id}</p>
                                    </div>
                                    <div className="userListAlbumId">
                                        <p>{data.albumId}</p>
                                    </div>
                                    <div className="userListTitle">
                                        <p>{data.title}</p>
                                    </div>
                                    <div className="userListImage">
                                        <img src={data.thumbnailUrl} alt="" />
                                    </div>
                                    <div className="userListActions">
                                        <button value={index} onClick={e => { this.removeRow(e, data.id) }} >Delete</button>
                                    </div>
                                </div>)
                            }) : <p>No Data....</p>
                        }
                    </div>
                    <div className="dspflx-hrcntr">
                        <button onClick={e => { this.changeTheData(e, "prev state") }} className={this.state.intialRange === 0 ? "isDisable":"isEnable"} disabled={this.state.intialRange === 0 ? true : false} >Prev </button>
                        <button onClick={e => { this.changeTheData(e, "next state") }}  >Next</button>
                    </div>

                </div>
            </div>
        )
    }
}
const mapDispachToProps = ($dispach) => {
    return {
        gettingUserDetails: function (start, limit) {
            const url = `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
            axios.get(url).then(response => response.data)
                .then((data) => {
                    $dispach(Actions.getUserDetails(data))
                })
        },
    }
}

const mapStateToProps = (state) => {
    let getUserDetails = state.getIn(["data", "getUserDetails"]);
    return {
        getUserDetails: getUserDetails
    }
}
export default connect(mapStateToProps, mapDispachToProps)(UsersList);