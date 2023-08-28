# Text Recognition Application using AWS Services

## Introduction

The Text Recognition Application is a cloud-based solution that leverages AWS services to offer users the ability to extract text from images using Amazon Textract. This user-friendly application facilitates the extraction of text from various sources, including handwritten notes, scanned documents, printed text, and code snippets.

![Project Architecture](https://github.com/kishore7403/AWS_Textract_TextRecognition/assets/48860055/79468ca2-8152-46a7-b334-385400ccc01c)

## Project Links

- [Hosted Application](http://52.73.6.62:3000/) (If not working refer to demo videos below).
- [Explanation Video - Part 1](https://your-video-link-part-1.com)
- [Explanation Video - Part 2](https://your-video-link-part-2.com)

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Project Goals and Objectives](#project-goals-and-objectives)
- [Target Users](#target-users)
- [Performance Targets](#performance-targets)
- [Services Used](#services-used)
- [How Cloud Mechanisms Fit Together](#how-cloud-mechanisms-fit-together)
- [Data Storage](#data-storage)
- [Programming Languages](#programming-languages)

## Project Goals and Objectives

The primary goal of this project is to create an efficient and secure application for text recognition using Amazon Textract. Key objectives include:

- Enabling users to log in securely.
- Accepting image uploads in multiple formats.
- Accurate and efficient text recognition.
- Support for various use cases and input types.
- High availability, scalability, and cost-effectiveness.

## Target Users

This application is designed for individuals and professionals who require accurate text extraction from diverse sources. Target users include students, researchers, programmers, administrators, and anyone dealing with text data from various inputs.

## Performance Targets

- **Response Time:** The application aims for fast processing with minimal response time per image.
- **Accuracy:** The text recognition engine strives for high accuracy to minimize extraction errors.
- **Versatility:** The application is designed to handle a wide range of text recognition tasks.
- **Scalability:** The system is built to efficiently scale to accommodate user demand and task complexities.

## Services Used

The following AWS services are utilized in this project:

- **Compute:** Amazon EC2, AWS Lambda
- **Storage:** Amazon S3, Amazon DynamoDB
- **Security:** AWS Secrets Manager
- **Text Recognition:** Amazon Textract
- **Network:** Amazon API Gateway

## How Cloud Mechanisms Fit Together

Amazon API Gateway serves as the entry point, routing user requests from the frontend hosted on Amazon EC2 to relevant AWS Lambda functions. These functions handle user login, image uploads, and text extraction. Amazon DynamoDB securely stores user data, while Amazon S3 stores uploaded images. The Lambda function responsible for text extraction employs Amazon Textract to process images and extract text. AWS Secrets Manager ensures secure access to DynamoDB and S3. The combination of these cloud mechanisms creates a robust and scalable system, offering users a seamless experience.

## Data Storage

- User information and login credentials are stored in Amazon DynamoDB, a secure NoSQL database.
- Uploaded images are stored in Amazon S3, providing scalable and durable object storage.

## Programming Languages

- Python: Used for writing AWS Lambda functions.
- JavaScript: Used for frontend application development.
