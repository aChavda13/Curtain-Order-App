import React from 'react';
import ProductView from './ProductView';
import CurtainTableList from './CurtainTableList';
import { timingSafeEqual } from 'crypto';

export default class Curtains extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curtainData: [],
            editRow: '',
            room: "",
            length: "",
            width: "",
            pleats: "",
            style: "",
            notes: "",
            suburbData: [],
            materialData: [],
            colourData: [],
            orderData: []
        }
        this.loadSuburb = this.loadSuburb.bind(this);
        this.loadMaterial = this.loadMaterial.bind(this);
        this.loadColour = this.loadColour.bind(this);
        this.updateStateData = this.updateStateData.bind(this);
        this.saveAll = this.saveAll.bind(this);
        this.loadCurtainData = this.loadCurtainData.bind(this);
    }

    loadSuburb() {
        fetch("http://localhost:8181/suburbs")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        suburbData: result
                    });
                }
            )
    }

    loadMaterial() {
        fetch("http://localhost:8181/materials")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        materialData: result
                    });
                }
            )
    }

    loadColour() {
        fetch("http://localhost:8181/colours")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        colourData: result
                    });
                }
            )
    }

    onChangeHandle = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    addRecord = () => {

        let newId;

        if (this.state.curtainData.length != 0) {
            newId = this.state.curtainData[this.state.curtainData.length - 1].id + 1;
        } else {
            newId = 1;
        }

        var newObj = {
            id: newId,
            room: this.state.room,
            length: this.state.length,
            width: this.state.width,
            pleats: this.state.pleats,
            style: this.state.style,
            notes: this.state.notes
        };

        this.state.curtainData.push(newObj);
        this.updateStateData(this.state.curtainData);

        this.setState({
            id: "",
            room: "",
            length: "",
            width: "",
            pleats: "",
            style: "",
            notes: "",
            curtainData: this.state.curtainData
        });
    }

    deleteRecord = (index) => {

        this.state.curtainData.splice(index, 1);

        this.setState({
            curtainData: this.state.curtainData
        });

    };

    updateRecord = (index, room, length, width, pleats, style, notes) => {

        this.state.curtainData[index].room = room;
        this.state.curtainData[index].length = length;
        this.state.curtainData[index].width = width;
        this.state.curtainData[index].pleats = pleats;
        this.state.curtainData[index].style = style;
        this.state.curtainData[index].notes = notes;

        this.setState({
            curtainData: this.state.curtainData
        });

        this.updateStateData(this.state.curtainData);
    };

    componentDidMount() {
        this.loadSuburb()
        this.loadMaterial()
        this.loadColour()
        this.loadCurtainData()
    }

    updateStateData(newData) {
        let newSD = Object.assign({}, this.state.orderData, newData)
        this.setState({
            orderData: newSD
        })
    }

    saveAll() {

        fetch('http://localhost:8181/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.orderData)
        })
    };

    loadCurtainData() {

        fetch("http://localhost:8181/data")
            .then(res => res.json())
            .then(
                (res) => {
                    var orderDataList = [];
                    var orderObj = {};
                    Object.keys(res).map(function (key, index) {
                        orderObj[key] = res[key];
                    });
                    orderDataList.push(orderObj);
                    
                   this.updateStateData(orderDataList)
                }
            )
        // .catch(error => this.setState({ error }));
    }

    render() {

        return (
            <div>
                <form className="ui form">
                    <ProductView
                        customerName={this.state.orderData.customerName}
                        suburb={this.state.suburbData}
                        suburbId={this.state.orderData.suburbId}
                        material={this.state.materialData}
                        materialId={this.state.orderData.materialId}
                        colour={this.state.colourData}
                        colourId={this.state.orderData.colourId}
                        updateStateData={this.updateStateData}
                    />
                    <div className="curtain_view">
                        <div className="row">
                            <div className="four wide column">
                                <h3>Curtains:</h3>
                            </div>
                            <p></p>
                            <div className="fields">
                                <div className="three wide field">
                                    <input type="text" placeholder="Room" name="room" value={this.state.room} onChange={this.onChangeHandle} />
                                </div>
                                <div className="three wide field">
                                    <input type="text" placeholder="Length" name="length" value={this.state.length} onChange={this.onChangeHandle} />
                                </div>
                                <div className="three wide field">
                                    <input type="text" placeholder="Width" name="width" value={this.state.width} onChange={this.onChangeHandle} />
                                </div>
                                <div className="three wide field">
                                    <input type="text" placeholder="Pleats" name="pleats" value={this.state.pleats} onChange={this.onChangeHandle} />
                                </div>
                                <div className="three wide field">
                                    <input type="text" placeholder="Style" name="style" value={this.state.style} onChange={this.onChangeHandle} />
                                </div>
                                <div className="three wide field">
                                    <input type="text" placeholder="Notes" name="notes" value={this.state.notes} onChange={this.onChangeHandle} />
                                </div>
                                <span className="buttons-wrapper">
                                    <input type="button" className="ui blue button " value="Add" onClick={this.addRecord} />
                                </span>
                            </div>
                        </div>
                        <CurtainTableList
                            curtainData={this.state.curtainData}
                            deleteRecord={this.deleteRecord}
                            updateRecord={this.updateRecord}
                            updateStateData={this.updateStateData}
                            orderData={this.state.orderData}
                        />
                        <p></p>

                        <div className="fields">
                            <div className="two wide column">
                                <input type="button" className="ui blue button " value="Back" />
                            </div>

                            <div className="two wide column">
                                <input type="button" className="ui blue button " value="Save All Changes" onClick={this.saveAll} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


