<div align="center">
	<br>
	<img width="156" src="https://raw.githubusercontent.com/ClydeDz/markdown-to-api/main/images/icon.png" alt="Markdown to API Azure DevOps Task icon">
	<br>
	<br>
</div>

# Markdown to API 
This is an Azure DevOps task that generates JSON files from Markdown files which can then be consumed by your frontend app. Basically, a static API generator.  

[![Azure DevOps builds](https://img.shields.io/azure-devops/build/clydedsouza/e3d74bc0-b833-41ea-8ec1-0d74115d662a/33?logo=Azure%20DevOps)](https://clydedsouza.visualstudio.com/Markdown%20to%20API/_build) 
[![Azure DevOps tests](https://img.shields.io/azure-devops/tests/clydedsouza/Markdown%2520to%2520API/33?logo=Azure%20DevOps)](https://clydedsouza.visualstudio.com/Markdown%20to%20API/_build) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ClydeDz_markdown-to-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=ClydeDz_markdown-to-api) 
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ClydeDz_markdown-to-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ClydeDz_markdown-to-api) 
![MIT License](https://img.shields.io/static/v1.svg?label=📜%20License&message=MIT&color=informational) 

## Tasks
![tasks](https://raw.githubusercontent.com/ClydeDz/markdown-to-api/main/images/markdowntoapitasks.png)   
The extension consists of the following two tasks. You need to add these tasks in this order. 
1. Install Markdown to API Dependencies   
2. Markdown to API

### Install Markdown to API Dependencies   
![tasks](https://raw.githubusercontent.com/ClydeDz/markdown-to-api/main/images/markdowntoapitasks-install.png)   
Add this task before the `Markdown to API` task so all the required dependencies can be installed and ready for use. No inputs required.    
 
### Markdown to API     
![tasks](https://raw.githubusercontent.com/ClydeDz/markdown-to-api/main/images/markdowntoapitasks-process.png)   
Add this task to process your Markdown files into JSON files. This task requires one user input - the location of the config file including the name of the file itself. So, in the screenshot above, the JSON config file was located in the `Example1` folder and was named `markdown-to-api.json` hence that's the value that was entered in the field. Remember, you can name the config anything you like, and as long as your config file follows the schema (details below), you should be sweet!  

#### Schema of the config file
The following JSON properties are expected in the config file.  
     
| Property           | Description                                                   | Mandatory? | Default value |    
|--------------------|---------------------------------------------------------------|------------|---------------|   
| inputDir           | Path to folder where the input Markdown files are located.    | **Yes**    | N/A           |   
| inputFileExtension | The file extension of the input files.                        | No         | `.md`        |    
| outputDir          | Path to folder where the processed JSON files will be placed. | No         | `output/all`  |   
| summaryOutputDir   | Path to folder where the summary JSON file will be placed.    | No         | `output/summary`  |   
| summaryFilename    | The filename of the summary JSON file.                        | No         | `summaryJSON<DATETIME_VALUE>.json`          |    

       
Find more information on the usage and different scenarios in [this GitHub repository](https://github.com/ClydeDz/markdown-to-api-examples).   

## Support  
The easiest way is to [create an issue](https://github.com/ClydeDz/markdown-to-api/issues/new) in the GitHub repository.  

## Credits
Copyright (c) 2020 Clyde D'Souza  
This extension is developed by [Clyde D'Souza](https://twitter.com/clydedz).    
The npm package [processmd](https://www.npmjs.com/package/processmd) is developed by [Tim Scanlin](https://github.com/tscanlin).