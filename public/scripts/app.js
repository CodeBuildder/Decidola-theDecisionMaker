'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decidola = function (_React$Component) {
    _inherits(Decidola, _React$Component);

    function Decidola(props) {
        _classCallCheck(this, Decidola);

        var _this = _possibleConstructorReturn(this, (Decidola.__proto__ || Object.getPrototypeOf(Decidola)).call(this, props));

        _this.onRemoveAll = _this.onRemoveAll.bind(_this);
        _this.onRemoveOption = _this.onRemoveOption.bind(_this);
        _this.randPick = _this.randPick.bind(_this);
        _this.addOption = _this.addOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(Decidola, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            try {

                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                console.log('Saving this Data.');
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('Component Unmounted');
        }
    }, {
        key: 'randPick',
        value: function randPick() {
            var _this2 = this;

            this.setState(function () {

                var randNum = Math.floor(Math.random() * _this2.state.options.length);
                var option = _this2.state.options[randNum];
                alert(option);
            });
        }
    }, {
        key: 'onRemoveAll',
        value: function onRemoveAll() {
            this.setState(function () {
                return {

                    options: []
                };
            });
        }
    }, {
        key: 'onRemoveOption',
        value: function onRemoveOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'addOption',
        value: function addOption(option) {

            if (!option) {
                return 'I am sorry, I quite did not catch that task. Please give a valid task.';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'Hey, you have already entered this ask. Try another one!';
            }

            this.setState(function (prevState) {
                return {

                    options: prevState.options.concat([option])

                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Decidola';
            var subtitle = 'Hey, this is Decidola. Let me help you decide your tasks for you.';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    optionCheck: this.state.options.length > 0,
                    randPick: this.randPick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    onRemoveAll: this.onRemoveAll,
                    onRemoveOption: this.onRemoveOption
                }),
                React.createElement(AddOptions, {
                    addOption: this.addOption
                })
            );
        }
    }]);

    return Decidola;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Decidola'
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.randPick,
                disabled: !props.optionCheck
            },
            'Ask me what to do?'
        )
    );
};
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.onRemoveAll },
            'Remove All Tasks'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Hey, you can activate me by adding any task!'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                onRemoveOption: props.onRemoveOption
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.onRemoveOption(props.optionText);
                }

            },
            'Remove'
        )
    );
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        var _this3 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

        _this3.addOption = _this3.addOption.bind(_this3);
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    _createClass(AddOptions, [{
        key: 'addOption',
        value: function addOption(e) {
            e.preventDefault();

            var option = e.target.elements.option.value.trim();
            var error = this.props.addOption(option);

            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.addOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Task'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(Decidola, null), document.getElementById('app'));
