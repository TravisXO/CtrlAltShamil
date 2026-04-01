# ── Stage 1: Build React ──────────────────────────────────────────
FROM node:20-alpine AS client-build

WORKDIR /app/ctrlaltshamil.client

COPY ctrlaltshamil.client/package*.json ./
RUN npm ci

COPY ctrlaltshamil.client/ ./
RUN npm run build

# ── Stage 2: Build .NET ───────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS server-build

WORKDIR /app

COPY CtrlAltShamil.Server/CtrlAltShamil.Server.csproj ./CtrlAltShamil.Server/
RUN dotnet restore ./CtrlAltShamil.Server/CtrlAltShamil.Server.csproj

COPY CtrlAltShamil.Server/ ./CtrlAltShamil.Server/
RUN dotnet publish ./CtrlAltShamil.Server/CtrlAltShamil.Server.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# ── Stage 3: Copy React build into wwwroot ────────────────────────
FROM server-build AS final-prep
COPY --from=client-build /app/ctrlaltshamil.client/dist /app/publish/wwwroot

# ── Stage 4: Runtime ──────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app
COPY --from=final-prep /app/publish ./

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "CtrlAltShamil.Server.dll"]
