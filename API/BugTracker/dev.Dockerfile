# ==== CONFIGURE =====

# Start with the official .NET 6 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Set the working directory to /app inside the container
WORKDIR /API

# Copy the source code and .csproj files to the container
COPY . ./

# Restore dependencies for BugTracker and BugTracker.Contracts
RUN dotnet restore

# Build the application in Release configuration and output to the 'out' folder
RUN dotnet publish -c Release -o out

# Start with the official .NET 6 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set the working directory to /app inside the container
WORKDIR /API

# Copy the published output from the build environment to the runtime image
COPY --from=build-env /API/out .

# Expose the port on which the app will be running
EXPOSE 80

# Set the entrypoint to run the application
ENTRYPOINT ["dotnet", "BugTracker.dll"]
