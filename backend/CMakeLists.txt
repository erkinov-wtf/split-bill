cmake_minimum_required(VERSION 3.12...3.31)
project(service_template CXX)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")
include(DownloadUserver)

find_package(userver COMPONENTS core postgresql QUIET)
if (NOT userver_FOUND)
    # Tries TRY_DIR first, falls back to downloading userver from GitHub using CPM.
    download_userver(TRY_DIR third_party/userver)
endif ()

userver_setup_environment()


# Common sources
add_library(${PROJECT_NAME}_objs OBJECT
        src/models/detailed-room.cpp
        src/models/detailed-room.hpp
        src/models/product.cpp
        src/models/product.hpp
        src/models/room.cpp
        src/models/room.hpp
        src/models/session.hpp
        src/models/user.hpp
        src/models/user-product.cpp
        src/models/user-product.hpp


        src/handlers/lib/auth.cpp
        src/handlers/lib/auth.hpp


        src/handlers/v1/login/view.cpp
        src/handlers/v1/login/view.hpp
        src/handlers/v1/register/view.cpp
        src/handlers/v1/register/view.hpp


        src/handlers/v1/products/filters.cpp
        src/handlers/v1/products/filters.hpp
        src/handlers/v1/products/add-product/view.cpp
        src/handlers/v1/products/add-product/view.hpp
        src/handlers/v1/products/delete-product/view.cpp
        src/handlers/v1/products/delete-product/view.hpp
        src/handlers/v1/products/get-product/view.cpp
        src/handlers/v1/products/get-product/view.hpp
        src/handlers/v1/products/get-products/view.cpp
        src/handlers/v1/products/get-products/view.hpp


        src/handlers/v1/rooms/filters.cpp
        src/handlers/v1/rooms/filters.hpp
        src/handlers/v1/rooms/create-room/view.cpp
        src/handlers/v1/rooms/create-room/view.hpp
        src/handlers/v1/rooms/get-all-rooms/view.cpp
        src/handlers/v1/rooms/get-all-rooms/view.hpp
        src/handlers/v1/rooms/get-created-rooms/view.cpp
        src/handlers/v1/rooms/get-created-rooms/view.hpp
        src/handlers/v1/rooms/get-room/view.cpp
        src/handlers/v1/rooms/get-room/view.hpp
        src/handlers/v1/rooms/get-room-user-prices/view.cpp
        src/handlers/v1/rooms/get-room-user-prices/view.hpp
        src/handlers/v1/rooms/get-room-users/view.cpp
        src/handlers/v1/rooms/get-room-users/view.hpp
        src/handlers/v1/rooms/join-room/view.cpp
        src/handlers/v1/rooms/join-room/view.hpp
        src/handlers/v1/rooms/update-room/view.cpp
        src/handlers/v1/rooms/update-room/view.hpp


        src/handlers/v1/user-products/filters.cpp
        src/handlers/v1/user-products/filters.hpp
        src/handlers/v1/user-products/add-user-to-product/view.cpp
        src/handlers/v1/user-products/add-user-to-product/view.cpp
        src/handlers/v1/user-products/get-user-product/view.hpp
        src/handlers/v1/user-products/get-user-product/view.hpp
        src/handlers/v1/user-products/get-user-products/view.hpp
        src/handlers/v1/user-products/get-user-products/view.hpp
        src/handlers/v1/user-products/update-user-product/view.hpp
        src/handlers/v1/user-products/update-user-product/view.hpp
)
target_link_libraries(${PROJECT_NAME}_objs PUBLIC userver::postgresql)


# The Service
add_executable(${PROJECT_NAME} src/main.cpp)
target_link_libraries(${PROJECT_NAME} PRIVATE ${PROJECT_NAME}_objs)


# Benchmarks
add_executable(${PROJECT_NAME}_benchmark
)
target_link_libraries(${PROJECT_NAME}_benchmark PRIVATE ${PROJECT_NAME}_objs userver::ubench)
add_google_benchmark_tests(${PROJECT_NAME}_benchmark)


# Functional Tests
userver_testsuite_add_simple()


# Install
include(GNUInstallDirs)

if (DEFINED ENV{PREFIX})
    message(STATUS "Set install prefix: $ENV{PREFIX}")
    file(TO_CMAKE_PATH "$ENV{PREFIX}" PREFIX_PATH)
    set(CMAKE_INSTALL_PREFIX ${PREFIX_PATH})
endif ()

file(GLOB CONFIGS_FILES ${CMAKE_CURRENT_SOURCE_DIR}/configs/*.yaml ${CMAKE_CURRENT_SOURCE_DIR}/configs/*.json)

install(TARGETS ${PROJECT_NAME} DESTINATION ${CMAKE_INSTALL_BINDIR} COMPONENT ${PROJECT_NAME})
install(FILES ${CONFIGS_FILES} DESTINATION ${CMAKE_INSTALL_SYSCONFDIR}/${PROJECT_NAME} COMPONENT ${PROJECT_NAME})
