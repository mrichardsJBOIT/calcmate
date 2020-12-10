import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from "lodash";
import setAxiosHeaders from "./AxiosHeaders";

class CalculatorApp extends React.Component {
    state = {
       calculationResult: this.props.calculationResultRef,
    };

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.firstOperandRef = React.createRef();
        this.givenOperatorRef = React.createRef();
        this.secondOperandRef = React.createRef();
        this.calculationResultRef = React.createRef();
        this.createCalculationResult = this.createCalculationResult.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        setAxiosHeaders();
        axios
            .post('/api/v1/calculations', {
                data: {
                    first_operand: this.firstOperandRef.current.value,
                    given_operator: this.givenOperatorRef.current.value,
                    second_operand: this.secondOperandRef.current.value,
                },
            })
            .then(response => {
                const result = response.data
                this.createCalculationResult(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange() {
        this.setState({
            first_operand: this.firstOperandRef,
            given_operator: this.givenOperatorRef,
            second_operand: this.secondOperandRef,
        });
        this.updateCalculation();
    }

    updateCalculation = _.debounce(() => {
        setAxiosHeaders();
        axios
            .post('/api/v1/calculations', {
                data: {
                    first_operand: this.firstOperandRef.current.value,
                    given_operator: this.givenOperatorRef.current.value,
                    second_operand: this.secondOperandRef.current.value,
                },
            })
            .then(response => {
                const result = response.data
                this.createCalculationResult(result)
            })
            .catch(error => {
                console.log(error);
            });
    }, 1000);

    createCalculationResult(result) {
       this.setState( {
           first_operand: result.first_operand,
           given_operator: result.given_operator,
           second_operand: result.second_operand,
           calculationResult: result.result
       })
    }

    render() {
        return (
            <>
              <form onSubmit={this.handleSubmit} className="my-3">
                <div className="form-row">
                    <div className="form-group col-xs-2">
                        <input
                            type="text"
                            name="first_operand"
                            onChange={this.handleChange}
                            ref={this.firstOperandRef}
                            required
                            className="form-control"
                            id="first_operand"
                            placeholder="0"
                        />
                    </div>
                    <div className="form-group col-xs-4">

                        <select id="given_operator"
                                name="given_operator"
                                size="4"
                                onChange={this.handleChange}
                                ref={this.givenOperatorRef}
                                required
                                width = "50"
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                        </select>
                    </div>
                    <div className="form-group col-xs-2">
                        <input
                            type="text"
                            name="second_operand"
                            onChange={this.handleChange}
                            ref={this.secondOperandRef}
                            required
                            className="form-control"
                            id="second_operand"
                            placeholder="0"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <button className="btn btn-outline-success btn-block">
                            Calculate
                        </button>
                    </div>

                </div>
              </form>
                <div class="col-sm-4 d-block p-2 bg-dark text-white">=
                    <output id="calc_result">{this.state.calculationResult}</output>
                </div>


            </>
        )
    }
};

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('calculator-app')
    app && ReactDOM.render(<CalculatorApp />, app)
})
