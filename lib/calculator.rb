class Calculator

  attr_reader :first_operand, :given_operator, :second_operand

  def initialize(first_operand, given_operator, second_operand)
    @first_operand = first_operand
    @given_operator = given_operator
    @second_operand = second_operand
  end

  def calculate!
    @first_operand.send(@given_operator, @second_operand) unless [:*, :+, :-, :/].include? @given_operator.to_sym
  end
end