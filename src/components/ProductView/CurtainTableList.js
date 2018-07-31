import React from 'react';

export default class CurtainTableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editRow: '',
      room: "",
      length: "",
      width: "",
      pleats: "",
      style: "",
      notes: ""
    };
  }

  toggleEditRecord = (index, room, length, width, pleats, style, notes) => {

    this.setState({
      editRow: index,
      room: room,
      length: length,
      width: width,
      pleats: pleats,
      style: style,
      notes: notes
    });
  };

  cancelEditRecord = index => {
    this.setState({
      editRow: '',
      room: "",
      length: "",
      width: "",
      pleats: "",
      style: "",
      notes: ""
    });
  };

  handleOnChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  saveEditRecord = (index) => {

    this.setState({
      editRow: ''
    });

    this.props.updateRecord(index, this.state.room, this.state.length, this.state.width, this.state.pleats, this.state.style, this.state.notes);

  };

  render() {
    var self = this;
    var thisEditRow = this.state.editRow;

    let curtainsData = this.props.curtainData.map(function (curtain, index) {

      if (thisEditRow === index) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input type="text" placeholder="Room" name="room" defaultValue={curtain.room} onChange={self.handleOnChange} />
            </td>
            <td>
              <input type="text" placeholder="Length" name="length" defaultValue={curtain.length} onChange={self.handleOnChange} />
            </td>
            <td>
              <input type="text" placeholder="Width" name="width" defaultValue={curtain.width} onChange={self.handleOnChange} />
            </td>
            <td>
              <input type="text" placeholder="Pleats" name="pleats" defaultValue={curtain.pleats} onChange={self.handleOnChange} />
            </td>
            <td>
              <input type="text" placeholder="Style" name="style" defaultValue={curtain.style} onChange={self.handleOnChange} />
            </td>
            <td>
              <input type="text" placeholder="Notes" name="notes" defaultValue={curtain.notes} onChange={self.handleOnChange} />
            </td>
            <td>
              <span className="buttons-wrapper">
                <button className="ui medium button" onClick={() => self.cancelEditRecord(index)}>
                  Cancel
              </button>
                <button className="ui blue button" onClick={() => self.saveEditRecord(index)}>Save</button>
              </span>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{curtain.room}</td>
            <td>{curtain.length}</td>
            <td>{curtain.width}</td>
            <td>{curtain.pleats}</td>
            <td>{curtain.style}</td>
            <td>{curtain.notes}</td>
            <td>
              <span className="button" onClick={() => self.toggleEditRecord(index, curtain.room, curtain.length, curtain.width, curtain.pleats, curtain.style, curtain.notes)}><i className="edit icon"></i></span>&nbsp;&nbsp;
            <span className="button" onClick={() => self.props.deleteRecord(index)}><i className="remove icon"></i></span>
            </td>
          </tr>
        );
      }
    });

    return (
      <table className="ui striped table">
        <thead>
          <tr>
            <th className="one wide">No</th>
            <th className="two wide">Room</th>
            <th className="two wide">Length</th>
            <th className="two wide">Width</th>
            <th className="two wide">Pleats</th>
            <th className="two wide">Style</th>
            <th className="two wide">Notes</th>
            <th className="three wide">Action</th>
          </tr>
        </thead>
        <tbody>{curtainsData}</tbody>
      </table>
    );
  }
}
