terraform {
  required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } }
}
provider "aws" { region = var.aws_region }
resource "aws_vpc" "marketplus_vpc" { cidr_block = "10.0.0.0/16" tags = { Name = "marketplus-vpc" } }
resource "aws_subnet" "public_subnet_a" { vpc_id = aws_vpc.marketplus_vpc.id cidr_block = "10.0.1.0/24" availability_zone = "${var.aws_region}a" map_public_ip_on_launch = true tags = { Name = "marketplus-public-subnet-a" } }
resource "aws_internet_gateway" "marketplus_igw" { vpc_id = aws_vpc.marketplus_vpc.id tags = { Name = "marketplus-igw" } }
resource "aws_route_table" "public_rt" { vpc_id = aws_vpc.marketplus_vpc.id route { cidr_block = "0.0.0.0/0" gateway_id = aws_internet_gateway.marketplus_igw.id } tags = { Name = "marketplus-public-rt" } }
resource "aws_route_table_association" "public_assoc_a" { subnet_id = aws_subnet.public_subnet_a.id route_table_id = aws_route_table.public_rt.id }
resource "aws_security_group" "jenkins_sg" { name = "marketplus-jenkins-sg" vpc_id = aws_vpc.marketplus_vpc.id ingress { from_port = 22 to_port = 22 protocol = "tcp" cidr_blocks = ["0.0.0.0/0"] } ingress { from_port = 80 to_port = 80 protocol = "tcp" cidr_blocks = ["0.0.0.0/0"] } ingress { from_port = 8080 to_port = 8080 protocol = "tcp" cidr_blocks = ["0.0.0.0/0"] } egress { from_port = 0 to_port = 0 protocol = "-1" cidr_blocks = ["0.0.0.0/0"] } tags = { Name = "marketplus-jenkins-sg" } }
