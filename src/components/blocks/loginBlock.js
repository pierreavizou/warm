var React = global.React || require('react');

var WarmForm = require('../forms/form');
var RoundButton = require('../buttons/roundButton');

/**
* Retrieve the current appActiveView, search & dashboard from the stores
* @return {object} search
*/
function getState() {
    return {
        isTileActive: false,
        error: {
            isVisible: false,
            message: null
        }
    };
}

var LoginTile = React.createClass({
    propTypes: {
        loginRequestMethod: React.PropTypes.func,
        title: React.PropTypes.string,
    },
    getDefaultProps: function() {
        return {
            loginRequestMethod: function(){},
            title : 'Login'
        };
    },
    onValidField: function (ret) {
        var error = {isVisible: false, content: null};
        this.setState({
            error: error
        });
    },
    onInvalidField: function (ret) {
        var error = {isVisible: true, content: "Le champ est incorrect"};
        this.setState({
            error: error
        });
    },
    getInitialState: function() {
        return getState();
    },
    toggleFormVisible: function () {
        this.setState({
            isTileActive: !this.state.isTileActive || false
        });
    },
    onFormSubmit: function (data) {
        var that = this;
        this.props.loginRequestMethod(data.formData, function (response) {
            if (response.error === true) {
                that.setState({
                    error: {isVisible: true, message: response.value}
                });
            }
        });
    },
    render: function() {
      console.log("formComponentsConfig", formComponentsConfig);
      var formComponentsConfig = [
          {
              "kind" : "input",
              "type" : "text",
              "name" : "emailLogin",
              "onValid" : this.onValidField,
              "onInvalid" : this.onInvalidField,
              "placeholder" : "Email",
              "conditions" : ["mail"],
              "required" : true
          },
          {
              "kind" : "input",
              "type" : "password",
              "name" : "passwordLogin",
              "onValid" : this.onValidField,
              "onInvalid" : this.onInvalidField,
              "placeholder" : "Password",
              "required" : true
          },
          {
              "kind" : "button",
              "name" : "Submit button",
              "type" : "submit",
              "inlineText": "Se connecter"
          }
      ];
        return (
            <div className="warm-component warm-surface-component warm-login">
                <div className={(this.state.isTileActive == false) ? "login-face in-active":"login-face active"}>
                    <h2>{this.props.title}</h2>
                    <RoundButton onClickMethod={this.toggleFormVisible}/>
                </div>
                <div className={(this.state.isTileActive == false) ? "warm-form in-active":"warm-form active"}>
                    <h2>Connexion</h2>
                    <WarmForm onFormSubmit={this.onFormSubmit} formComponents={formComponentsConfig} error={this.state.error}/>
                </div>
            </div>
        );
    }
});

module.exports = LoginTile;