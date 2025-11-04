FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
COPY . ./src
WORKDIR /src
RUN dotnet build -o /app
RUN dotnet publish -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
COPY --from=build /publish /app
WORKDIR /app
EXPOSE 80
CMD ["./API"]