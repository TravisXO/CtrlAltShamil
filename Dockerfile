# Stage 1: Build React client
FROM node:20-alpine AS client-build
WORKDIR /app/ctrlaltshamil.client
COPY ctrlaltshamil.client/package*.json ./
RUN npm ci
COPY ctrlaltshamil.client/ ./
RUN npm run build

# Stage 2: Build & publish .NET server
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS server-build
WORKDIR /app
COPY CtrlAltShamil.Server/*.csproj ./CtrlAltShamil.Server/
RUN dotnet restore ./CtrlAltShamil.Server/CtrlAltShamil.Server.csproj
COPY CtrlAltShamil.Server/ ./CtrlAltShamil.Server/
COPY --from=client-build /app/ctrlaltshamil.client/dist ./CtrlAltShamil.Server/wwwroot/
RUN dotnet publish ./CtrlAltShamil.Server/CtrlAltShamil.Server.csproj -c Release -o /publish --no-restore

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=server-build /publish ./
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
CMD ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet CtrlAltShamil.Server.dll
