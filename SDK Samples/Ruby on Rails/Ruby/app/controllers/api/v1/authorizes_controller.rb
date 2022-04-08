require 'openssl'
require "base64"
require 'net/http'
require 'json'
class Api::V1::AuthorizesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create 
        #Get the EmbedSecret key from Bold BI(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        @embedSecret = "BLb36Sblz2ISqZPa4WyVeOioqHLRXAVI"
        #Enter your Bold BI credentials
        @userEmail = "admin@domain.com"
        @EmbedQueryString = params[:embedQuerString]
        @DashboardServerApiUrl = params[:dashboardServerApiUrl]
        getEmbedDetails
        render :json => Net::HTTP.get(URI.parse(@ApiUrl))
    end

    private
def getEmbedDetails
    @EmbedQueryString = @EmbedQueryString << "&embed_user_email=" << @userEmail
    getSignatureUrl
    @EmbedSignature = "&embed_signature=" + @signature;
    @EmbedDetailsUrl = "/embed/authorize?" + @EmbedQueryString.downcase + @EmbedSignature;
    @ApiUrl = @DashboardServerApiUrl << @EmbedDetailsUrl
end
def getSignatureUrl
    @EmbedQueryString = @EmbedQueryString.downcase
    @hmac = OpenSSL::HMAC.digest('sha256', @embedSecret, @EmbedQueryString)
    @signature = Base64.strict_encode64(@hmac)
end
end