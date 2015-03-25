/* global React */

(function () {
	'use strict';

	var TodoInput = React.createClass({displayName: "TodoInput",
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
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-lg-6"}, 
						  React.createElement("div", {className: "input-group"}, 
							React.createElement("input", {type: "text", value: this.state.value, 
									className: "form-control", placeholder: "Create todo...", 
									onChange: this.onInputChange}), 
							React.createElement("span", {className: "input-group-btn"}, 
							  React.createElement("button", {className: "btn btn-default", type: "button", 
								onClick: this.onAddClick}, "Add")
							)
						  )
						)
				  )
			);
		}
	}), TodoList = React.createClass({displayName: "TodoList",
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
					React.createElement("ul", {className: "list-group"}, 
					this.props.list.map(function(todo){
						return (React.createElement("li", {key: todo.id, className: "list-group-item"}, 
						  React.createElement("span", {className: "badge"}, new Date(todo.id).toString()), 
						  todo.todo
						));
					})
					)
			);
		}
	}),	Viewport = React.createClass({displayName: "Viewport",
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
				React.createElement("div", null, 
					React.createElement(TodoInput, {onAddClick: this.onAddClick}), 
					React.createElement(TodoList, {list: this.props.list})
				)
			);
		}
	}), viewport = document.getElementById("viewport");
	
	React.render(React.createElement(Viewport), viewport);

})();