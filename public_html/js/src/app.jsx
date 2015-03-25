/* global React */

(function () {
	'use strict';

	var TodoInput = React.createClass({
		propTypes: {
			onAddClick : React.PropTypes.func.isRequired
		},
		getDefaultProps: function () {
			return {
				addFunction: function(){}
			};
		},
		getInitialState: function () {
			return {
				value: ''
			};
		},
		onInputChange: function(event){
			this.setState({
				value: event.target.value
			});
		},
		onAddClick: function(){
			this.props.onAddClick({
				id: new Date().getTime(),
				todo: this.state.value
			});
			this.setState({value: ''});
		},
		render: function () {
			return (
					<div className="row">
						<div className="col-lg-6">
						  <div className="input-group">
							<input type="text" value={this.state.value} 
									className="form-control" placeholder="Create todo..."
									onChange={this.onInputChange}/>
							<span className="input-group-btn">
							  <button className="btn btn-default" type="button"
								onClick={this.onAddClick}>Add</button>
							</span>
						  </div>
						</div>
				  </div>
			);
		}
	}), TodoList = React.createClass({
		propTypes: {
			list : React.PropTypes.array.isRequired
		},
		getDefaultProps: function () {
			return {
				list: []
			};
		},
		render: function(){
			return (
					<ul className="list-group">
					{this.props.list.map(function(todo){
						return (<li key={todo.id} className="list-group-item">
						  <span className="badge">{new Date(todo.id).toString()}</span>
						  {todo.todo}
						</li>);
					})}
					</ul>
			);
		}
	}),	Viewport = React.createClass({
		getDefaultProps: function () {
			return {
				list: []
			};
		},
		onAddClick: function(todo){
			this.props.list.unshift(todo);
			this.setState({});
		},
		render: function(){
			return (
				<div>
					<TodoInput onAddClick={this.onAddClick}/>
					<TodoList list={this.props.list}/>
				</div>
			);
		}
	}), viewport = document.getElementById("viewport");
	
	React.render(React.createElement(Viewport), viewport);

})();