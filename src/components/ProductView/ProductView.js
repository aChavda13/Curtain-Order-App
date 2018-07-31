import React from 'react';

export default class ProductView extends React.Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
    }

    update(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.props.updateStateData(data);
    }

    render() {
        const suburb = this.props.suburb;    
        const material = this.props.material;
        const colour = this.props.colour;
        return (
            <div className="product_view">
                <h1 className="ui header">Product View</h1>
                <div className="tooltip-target vertically padded ui grid">
                    <div className="row">
                        <div className="three wide column">
                            <div className="ui input focus">
                                <input autoFocus type="text" name="customerName" value={this.props.customerName} placeholder="Customer Name" onChange={this.update}/>
                            </div>
                        </div>
                        <div className="four wide column">
                            <select className="ui fluid dropdown" name="suburbId" value={this.props.suburbId} onChange={this.update} >
                                <option value="">Select Suburb</option>
                                {
                                    suburb.map((s, index) => {
                                        return (
                                            <option key={index} value={s.value}>
                                                {s.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide column">
                            <select className="ui fluid dropdown" name="materialId" value={this.props.materialId} onChange={this.update} >
                                <option value="">Select Material</option>
                                {
                                    material.map((m, index) => {
                                        return (
                                            <option key={index} value={m.value}>
                                                {m.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide column">
                            <select className="ui fluid dropdown" name="colourId" value={this.props.colourId} onChange={this.update} >
                                <option value="">Select Colour</option>
                                {
                                    colour.map((m, index) => {
                                        return (
                                            <option key={index} value={m.value}>
                                                {m.name}
                                            </option>
                                        );
                                    })
                                }       
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


