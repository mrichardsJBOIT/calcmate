class Api::V1::CalculationsController < ApplicationController

  def index
    respond_to do |format|
      format.json { render :show, @result = {first_operand: 0, given_operator: "+", second_operand: 0, result: 0 }
      }
    end
  end

  def create
    puts "dave"
    @result = resp_body
    respond_to do |format|
      format.json { render :show, status: :created, location: api_v1_calculation_path(1, @result) }
    end
  end

  def show
    respond_to do |format|
      format.json { render :show, @result = {first_operand: 0, given_operator: "+", second_operand: 0, result: 0 }}
    end
  end

  def calculate
    do_calculation
  end

  protected

  def do_calculation
    first_operand = expression_params.fetch(:first_operand)
    given_operator = expression_params.fetch(:given_operator)
    second_operand = expression_params.fetch(:second_operand)
    if [:*, :+, :-, :/].include? given_operator.to_sym
      first_operand.to_f.send(given_operator, second_operand.to_f)
    else
      "ERROR"
    end
  end

  def resp_body
    {
      first_operand: expression_params.fetch(:first_operand),
      given_operator: expression_params.fetch(:given_operator),
      second_operand: expression_params.fetch(:second_operand),
      result: do_calculation
    }
  end

  def expression_params
    params.require(:data).permit(:first_operand, :given_operator, :second_operand)
  end

end
