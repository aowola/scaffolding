Scaffolding
============

You will need Node (0.10.15), Node Package Manager(1.3.5), Ruby(1.9.3p385) and SASS(3.2.5) installed. This project combines grunt, sass and bower with the addition of client side MVW Framework Backbone.

##Required Global Dependencies 
####Grunt Command Line Interface
    sudo npm install -g grunt-cli@0.1.9
####Bower 
    sudo npm install -g bower@1.2.3

Once you've pulled the project note bower.json file that defines the dependencies. In the terminal navigate to the GCE root folder and type the following command to pull down the files. 

####Install Build Related Dependencies    
    npm install
####Install Client Related Dependencies
    bower install

##Development
To build and host the solution locally the following grunt command should be used. It also institues a watch, which will perform an auto reload of the browser on completion.
####Build
    grunt server
####Build with custom port
    grunt server --port=1234
####Build with livereload
    grunt server --livereload=true

##Deployment
Current build target is a .tmp which will contain all the files necessary to deploy the solution.
####Build
    grunt