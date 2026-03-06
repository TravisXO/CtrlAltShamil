# ─────────────────────────────────────────
# Stage 1: Build React client
# ─────────────────────────────────────────
FROM node:20-alpine AS client-build
WORKDIR /app/ctrlaltshamil.client

# Install dependencies first (better layer caching)
COPY ctrlaltshamil.client/package*.json ./
RUN npm ci

# Copy source and build
COPY ctrlaltshamil.client/ ./
RUN npm run build


# ─────────────────────────────────────────
# Stage 2: Build & publish .NET server
# ─────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS server-build
WORKDIR /app

# Restore dependencies (cached unless .csproj changes)
COPY CtrlAltShamil.server/*.csproj ./CtrlAltShamil.server/
RUN dotnet restore ./CtrlAltShamil.server/CtrlAltShamil.server.csproj

# Copy server source
COPY CtrlAltShamil.server/ ./CtrlAltShamil.server/

# Copy built React app into wwwroot so ASP.NET can serve it
COPY --from=client-build /app/ctrlaltshamil.client/dist ./CtrlAltShamil.server/wwwroot/

# Publish in Release mode
RUN dotnet publish ./CtrlAltShamil.server/CtrlAltShamil.server.csproj \
    -c Release \
    -o /publish \
    --no-restore


# ─────────────────────────────────────────
# Stage 3: Final runtime image (lean)
# ─────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=server-build /publish ./

ENV ASPNETCORE_ENVIRONMENT=Production

# Render dynamically assigns a PORT — this picks it up at runtime
# Falls back to 8080 if PORT is not set
EXPOSE 8080
CMD ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet CtrlAltShamil.server.dll
