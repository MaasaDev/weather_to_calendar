// swift-tools-version: 5.7
import PackageDescription

let package = Package(
    name: "TestSwiftProject",
    platforms: [
        .macOS(.v12)
    ],
    dependencies: [
        .package(url: "https://github.com/vapor/vapor.git", from: "4.0.0")
    ],
    targets: [
        .executableTarget(
            name: "SwiftWebSocketExec",
            dependencies: [
                .product(name: "Vapor", package: "vapor")
            ]
        )
    ]
)