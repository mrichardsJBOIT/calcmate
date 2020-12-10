Rails.application.routes.draw do
  root 'pages#home'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :calculations
    end
  end
  post "calculate", to: "api/v1/calculations#calculate"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
