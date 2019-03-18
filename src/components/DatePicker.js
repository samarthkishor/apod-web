import React, { Component } from 'react';

export class DatePicker extends Component {
  render() {
    return (
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-sm-12 col-md-6">
          <div className="border rounded-top shadow bg-white m-3">
            <h2 className="card-header text-center text-space">Check another day!</h2>
            <div className="form-inline p-3">
              <div className="mx-auto py-3">
                <input type="date" className="form-control mx-2" onChange={this.props.handleDateInput} />
                <button className="btn bg-space text-white" onClick={this.props.handleSubmit}>Check</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
