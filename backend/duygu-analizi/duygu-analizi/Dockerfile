# Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Proje dosyalarını kopyala ve bağımlılıkları indir
COPY *.csproj .
RUN dotnet restore

# Geri kalan her şeyi kopyala ve build et
COPY . .
RUN dotnet publish -c Release -o out

# Runtime aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Port 8080'de çalışması için
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "duygu-analizi.dll"]
