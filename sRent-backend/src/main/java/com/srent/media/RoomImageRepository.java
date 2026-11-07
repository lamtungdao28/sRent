package com.srent.media; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface RoomImageRepository extends JpaRepository<RoomImage,UUID>{List<RoomImage> findAllByRoomIdOrderBySortOrder(UUID roomId);}
