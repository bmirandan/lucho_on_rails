class UserDashboardController < ApplicationController
    def home
        @offer= Offer.all
    end
end
