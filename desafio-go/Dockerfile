FROM golang:1.7.3-alpine as build
WORKDIR /src
COPY app.go .
RUN go build -o /app .

FROM scratch as bin
COPY --from=build app /
CMD ["/app"]