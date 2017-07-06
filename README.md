# JSON Compression for Gaming
This library designed to make socket communitcation easier on gaming. The aim of this project is to create an easy to use, lightweight, compression library for web games. Basically, it converts JSON data into binary buffer. With this way, it provides compression and readeable data format on socket data transfer. If you experienced building multiplayer game network, you can guess potential problems like latency, sizes, security concerns. You can transfer your JSON data thought the network without calculeting buffers, array lengths. Here is the list of main features of this library so far :

  - **Transfer data as smaller as possible** (We compress some variables like true/false with only 3 bit, this feature is very useful especially for games)
  - **Easy to use and integrate** (It only has two functions to process data, encode and decode)
  - **Lightweight** (It can be use on games without any performance concern, it was already tested)

# Why and how?
In this year, we develop 4 web games and all of them was multiplayer. Our games received over 2 millions player and we've experienced alot things regarding optimization. We were using pure buffer functions on Node JS and client side but they are very difficult to construct and design. They are not just suitable for teams and updates. For example, when we wanted to change order of array, we have to build all over message and we should update client and server at the same time.

This is why we started to work our compression and converter function library. With this library only thing we have to do is putting our JSON data into **$pack.encode** function. Then receiving it with **$pack.decode** function. Even changing array order doesn't broke any statement on our loops.
